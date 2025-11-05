import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/services";
import type { AvailableSlot, ScheduleSessionRequest, ScheduleSessionResponse } from "@/types/schedule";

const fetchAvailableSlots = async (): Promise<AvailableSlot[]> => {
  const response = await httpClient.get<AvailableSlot[]>("/sessions/available-slots");
  return response.data;
};

const scheduleSession = async (data: ScheduleSessionRequest): Promise<ScheduleSessionResponse> => {
  const response = await httpClient.post<ScheduleSessionResponse>("/sessions", data);
  return response.data;
};

export const useSchedule = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["available-slots"],
    queryFn: fetchAvailableSlots,
  });

  const mutation = useMutation({
    mutationFn: scheduleSession,
    onSuccess: () => {
      // Invalidar cache para buscar novos slots disponíveis após agendamento
      queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
    onError: (error) => {
      console.error("Erro ao agendar sessão:", error);
    },
  });

  return {
    availableSlots: query.data || [],
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    scheduleSession: mutation.mutate,
    isScheduling: mutation.isPending,
    isScheduleSuccess: mutation.isSuccess,
    isScheduleError: mutation.isError,
    scheduleError: mutation.error,
    resetSchedule: mutation.reset,
  };
};
