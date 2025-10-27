// Configurações de ambiente
export const env = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:8081/api",
} as const;
