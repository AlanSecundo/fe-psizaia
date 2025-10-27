// Dados de cada step individual
export interface IdentificationStepData {
  fullName: string;
  socialName?: string;
  birthDate: string;
  gender: string;
  maritalStatus?: string;
  cpf?: string;
  isOver18: boolean;
}

export interface ContactStepData {
  email?: string;
  phone?: string;
  address?: string;
  preferredContactMethod?: string;
}

export interface EmergencyContactStepData {
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
}

export interface ClinicalInfoStepData {
  medicalHistory?: string;
  currentMedications?: string;
  allergies?: string;
  hasPsychiatricFollowUp?: boolean;
  doctorName?: string;
  doctorSpecialty?: string;
  doctorPhone?: string;
}

export interface BillingInsuranceStepData {
  insuranceProvider?: string;
  insuranceNumber?: string;
  hasInsurance?: boolean;
  document?: string;
  value?: string;
  totalSessions?: string;
  insurancePlan?: string;
  insuranceCard?: string;
  paymentMethodSelected?: string;
}

export interface OriginNotesStepData {
  referralSource?: string;
  notes?: string;
}

// Estrutura principal organizada por steps
export interface PatientFormData {
  identification: IdentificationStepData;
  contact: ContactStepData;
  emergencyContact: EmergencyContactStepData;
  clinicalInfo: ClinicalInfoStepData;
  billingInsurance: BillingInsuranceStepData;
  originNotes: OriginNotesStepData;
}
