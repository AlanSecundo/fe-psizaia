export interface TimeSlot {
  startTime: string;
  endTime: string;
  durationMinutes: number;
}

export interface AvailableSlot {
  date: string;
  timeSlots: TimeSlot[];
}

export interface ScheduleSessionRequest {
  patientId: string;
  scheduledDateTime: string;
  durationMinutes: number;
  type: "IN_PERSON" | "ONLINE";
  notes?: string;
  isRecurring: boolean;
}

export interface ScheduleSessionResponse {
  id: string;
  message?: string;
  success?: boolean;
}
