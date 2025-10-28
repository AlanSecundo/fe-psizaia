import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../services";
import type { UserRegistrationRequest } from "../types/userRegistration";
import { useAuthentication } from "./useAuthentication";

const registerUser = async (data: UserRegistrationRequest): Promise<void> => {
  await httpClient.post("/users", data);
};

export const useUserRegistration = () => {
  const { login: loginUser, isLoading: isLoginLoading, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError } = useAuthentication();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (_, variables) => {
      const loginData = {
        email: variables.email,
        password: variables.password,
      };
      loginUser(loginData);
    },
    onError: (error) => {
      console.error("Erro no cadastro:", error);
    },
  });

  return {
    register: registerMutation.mutate,
    isLoading: registerMutation.isPending || isLoginLoading,
    isSuccess: registerMutation.isSuccess && isLoginSuccess,
    isError: registerMutation.isError || isLoginError,
    error: registerMutation.error || loginError,
    reset: () => {
      registerMutation.reset();
    },
  };
};
