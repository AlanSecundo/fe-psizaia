// Tipos para cadastro de pacientes baseado na API
export interface PatientIdentification {
  fullName: string;
  socialName?: string;
  birthDate: string;
  gender: string;
  maritalStatus?: string;
  cpf: string;
  over18: boolean;
}

export interface PatientContact {
  email: string;
  phone: string;
  address: string;
  preferredContactMethod: string;
}

export interface PatientEmergencyContact {
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
}

export interface PatientClinical {
  initialComplaint: string;
  currentMedications: string;
  hasPsychiatricFollowUp: boolean;
  preferredPeriods: string;
  currentPhysicianName?: string;
  currentPhysicianSpecialty?: string;
  currentPhysicianPhone?: string;
}

export interface PatientBilling {
  paymentMethod: string;
  receiptDocument: string;
  dueDay: number;
  sessionPrice: number;
  sessionsPerMonth: number;
}

export interface PatientInsurance {
  hasInsurance: boolean;
  insurancePlan?: string;
  insuranceCardNumber?: string;
}

export interface PatientOriginNotes {
  origin: string;
  internalNotes: string;
}

// Estrutura principal da requisição de cadastro de paciente
export interface PatientRegistrationRequest {
  psychologistId: string;
  identification: PatientIdentification;
  contact: PatientContact;
  emergencyContact: PatientEmergencyContact;
  clinical: PatientClinical;
  billing: PatientBilling;
  insurance: PatientInsurance;
  originNotes: PatientOriginNotes;
}

// Resposta da API (pode ser ajustada conforme necessário)
export interface PatientRegistrationResponse {
  id: string;
  message: string;
  success: boolean;
}
