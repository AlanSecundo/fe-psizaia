import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/services";
import type { Patient } from "@/types/patient";

const fetchPatients = async (): Promise<Patient[]> => {
  const response = await httpClient.get<Patient[]>("/patients");
  return response.data;
};

export const usePatients = () => {
  const query = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  return {
    patients: query.data || [],
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
