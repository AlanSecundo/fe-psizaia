import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";
import type { RefreshTokenRequest, RefreshTokenResponse } from "@/types/auth";
import { AuthStorage } from "./auth-storage";

// Tipos para as configurações do cliente HTTP
export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Tipos para as respostas da API
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

// Tipos para erros da API
export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

// Classe principal do wrapper HTTP
export class HttpClient {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  private async refreshToken(): Promise<string | null> {
    const refreshToken = AuthStorage.getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await axios.post<RefreshTokenResponse>(`${env.API_URL}/auth/refresh`, { refreshToken } as RefreshTokenRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      AuthStorage.setAccessToken(accessToken);
      AuthStorage.setRefreshToken(newRefreshToken);
      return accessToken;
    } catch (error) {
      // Se o refresh falhar, limpar tokens
      AuthStorage.clear();
      // Redirecionar para login (usando window.location para evitar dependência do router)
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return null;
    }
  }

  constructor(config: HttpClientConfig = {}) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL || "",
      timeout: config.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });

    // Interceptor para requisições
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Lista de rotas que não precisam de autenticação
        const publicRoutes = [
          "/auth/login",
          "/auth/refresh",
          "/users", // cadastro de usuário
        ];

        // Verificar se a rota atual é pública
        const isPublicRoute = publicRoutes.some((route) => config.url?.includes(route));

        // Adicionar access token apenas se não for uma rota pública
        if (!isPublicRoute) {
          const token = AuthStorage.getAccessToken();
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Interceptor para respostas
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Se for erro 401 e não for uma rota pública, tentar refresh token
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
          const publicRoutes = ["/auth/login", "/auth/refresh", "/users"];
          const isPublicRoute = publicRoutes.some((route) => originalRequest.url?.includes(route));

          if (isPublicRoute) {
            const apiError: ApiError = {
              message: error.message || "Erro desconhecido",
              status: error.response?.status,
              data: error.response?.data,
            };
            return Promise.reject(apiError);
          }

          // Se já está fazendo refresh, adicionar a requisição na fila
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                if (originalRequest.headers && token) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                return this.axiosInstance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshToken();

            if (!newToken) {
              this.processQueue(new Error("Falha ao renovar token"), null);
              const apiError: ApiError = {
                message: "Sessão expirada. Faça login novamente.",
                status: 401,
                data: error.response?.data,
              };
              return Promise.reject(apiError);
            }

            // Atualizar token na requisição original
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }

            // Processar fila de requisições pendentes
            this.processQueue(null, newToken);
            this.isRefreshing = false;

            // Refazer a requisição original
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            this.isRefreshing = false;
            const apiError: ApiError = {
              message: "Erro ao renovar token de autenticação",
              status: 401,
              data: error.response?.data,
            };
            return Promise.reject(apiError);
          }
        }

        // Tratamento global de erros para outros casos
        const apiError: ApiError = {
          message: error.message || "Erro desconhecido",
          status: error.response?.status,
          data: error.response?.data,
        };
        return Promise.reject(apiError);
      },
    );
  }

  // Método GET
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      throw error;
    }
  }

  // Método POST
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      throw error;
    }
  }

  // Método PUT
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      throw error;
    }
  }

  // Método DELETE
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      throw error;
    }
  }

  // Método PATCH
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      throw error;
    }
  }

  // Método para atualizar configurações
  updateConfig(config: Partial<HttpClientConfig>): void {
    if (config.baseURL) {
      this.axiosInstance.defaults.baseURL = config.baseURL;
    }
    if (config.timeout) {
      this.axiosInstance.defaults.timeout = config.timeout;
    }
    if (config.headers) {
      this.axiosInstance.defaults.headers = {
        ...this.axiosInstance.defaults.headers,
        ...config.headers,
      };
    }
  }

  // Método para obter a instância do axios (para casos específicos)
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const httpClient = new HttpClient({
  baseURL: env.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
