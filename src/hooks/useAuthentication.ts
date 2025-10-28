import { useMutation } from "@tanstack/react-query";
import { AuthStorage, httpClient } from "../services";
import type { LoginRequest, LoginResponse } from "../types/auth";

const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await httpClient.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const useAuthentication = () => {
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      AuthStorage.setAccessToken(data.accessToken);

      await AuthStorage.setRefreshToken(data.refreshToken);
    },
    onError: (error) => {
      console.error("Erro no login:", error);
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};
