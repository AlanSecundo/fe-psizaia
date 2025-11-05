import { PatientFormData } from "@/types/patientForm";
import { PatientRegistrationRequest } from "@/types/patientRegistration";

// Função para mapear os dados do formulário para o formato da API
export const mapFormDataToApiRequest = (formData: PatientFormData, psychologistId: string): PatientRegistrationRequest => {
  return {
    psychologistId,
    identification: {
      fullName: formData.identification.fullName,
      socialName: formData.identification.socialName || undefined,
      birthDate: formData.identification.birthDate,
      gender: formData.identification.gender,
      maritalStatus: formData.identification.maritalStatus || undefined,
      cpf: formData.identification.cpf || "",
      over18: formData.identification.isOver18,
    },
    contact: {
      email: formData.contact.email || "",
      phone: formData.contact.phone || "",
      address: formData.contact.address || "",
      preferredContactMethod: formData.contact.preferredContactMethod || "",
    },
    emergencyContact: {
      emergencyContactName: formData.emergencyContact.emergencyContactName || "",
      emergencyContactRelationship: formData.emergencyContact.emergencyContactRelationship || "",
      emergencyContactPhone: formData.emergencyContact.emergencyContactPhone || "",
    },
    clinical: {
      initialComplaint: formData.clinicalInfo.medicalHistory || "",
      currentMedications: formData.clinicalInfo.currentMedications || "",
      hasPsychiatricFollowUp: formData.clinicalInfo.hasPsychiatricFollowUp || false,
      preferredPeriods: "manha,tarde", // Valor padrão, pode ser ajustado conforme necessário
      currentPhysicianName: formData.clinicalInfo.doctorName || undefined,
      currentPhysicianSpecialty: formData.clinicalInfo.doctorSpecialty || undefined,
      currentPhysicianPhone: formData.clinicalInfo.doctorPhone || undefined,
    },
    billing: {
      paymentMethod: formData.billingInsurance.paymentMethodSelected || "",
      receiptDocument: formData.billingInsurance.document || "",
      dueDay: 15, // Valor padrão, pode ser ajustado conforme necessário
      sessionPrice: parseFloat(formData.billingInsurance.value || "0"),
      sessionsPerMonth: parseInt(formData.billingInsurance.totalSessions || "0"),
    },
    insurance: {
      hasInsurance: formData.billingInsurance.hasInsurance || false,
      insurancePlan: formData.billingInsurance.insurancePlan || undefined,
      insuranceCardNumber: formData.billingInsurance.insuranceCard || undefined,
    },
    originNotes: {
      origin: formData.originNotes.referralSource || "",
      internalNotes: formData.originNotes.notes || "",
    },
  };
};
