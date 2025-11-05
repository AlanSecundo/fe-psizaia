import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../services";
import type { PatientRegistrationRequest, PatientRegistrationResponse } from "../types/patientRegistration";

const registerPatient = async (data: PatientRegistrationRequest): Promise<PatientRegistrationResponse> => {
  const response = await httpClient.post<PatientRegistrationResponse>("/patients", data);
  return response.data;
};

export const usePatientRegistration = () => {
  const mutation = useMutation({
    mutationFn: registerPatient,
    onSuccess: (data) => {
      console.log("Paciente cadastrado com sucesso:", data);
    },
    onError: (error) => {
      console.error("Erro no cadastro do paciente:", error);
    },
  });

  return {
    registerPatient: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};
