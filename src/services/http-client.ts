import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

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
      (config) => {
        // Aqui você pode adicionar lógica para tokens de autenticação
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Interceptor para respostas
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Tratamento global de erros
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

// Instância padrão do cliente HTTP
export const httpClient = new HttpClient();

// Funções de conveniência para usar diretamente
export const http = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => httpClient.get<T>(url, config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => httpClient.post<T>(url, data, config),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => httpClient.put<T>(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) => httpClient.delete<T>(url, config),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => httpClient.patch<T>(url, data, config),
};

// Exportação padrão
export default httpClient;
