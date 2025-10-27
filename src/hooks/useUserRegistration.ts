import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../services";
import type { UserRegistrationRequest } from "../types/userRegistration";

const registerUser = async (data: UserRegistrationRequest): Promise<void> => {
  await httpClient.post("/users", data);
};

export const useUserRegistration = () => {
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (_, variables) => {
      console.log("Usuário cadastrado com sucesso:", variables);
    },
    onError: (error) => {
      console.error("Erro no cadastro:", error);
    },
  });

  return {
    register: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};
