import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { AuthStorage, httpClient } from "../services";
import type { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from "../types/auth";

const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await httpClient.post<LoginResponse>("/auth/login", data);
  return response.data;
};

const refreshToken = async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
  const response = await httpClient.post<RefreshTokenResponse>("/auth/refresh", data);
  return response.data;
};

export const useAuthentication = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      AuthStorage.setAccessToken(data.accessToken);
      AuthStorage.setRefreshToken(data.refreshToken);
    },
    onError: (error) => {
      console.error("Erro no login:", error);
    },
  });

  const refreshTokenMutation = useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      AuthStorage.setAccessToken(data.accessToken);
      AuthStorage.setRefreshToken(data.refreshToken);
    },
    onError: (error) => {
      console.error("Erro ao renovar token:", error);
      AuthStorage.clear();
      navigate("/login");
    },
  });

  const logout = () => {
    AuthStorage.clear();
    navigate("/login");
  };

  const refresh = () => {
    const token = AuthStorage.getRefreshToken();
    if (token) {
      refreshTokenMutation.mutate({ refreshToken: token });
    } else {
      logout();
    }
  };

  return {
    login: loginMutation.mutate,
    logout,
    refresh,
    isLoading: loginMutation.isPending,
    isRefreshing: refreshTokenMutation.isPending,
    isSuccess: loginMutation.isSuccess,
    isError: loginMutation.isError,
    error: loginMutation.error,
    reset: loginMutation.reset,
  };
};
