// Interface para os dados de cadastro de usuário (request)
export interface UserRegistrationRequest {
  fullName: string;
  email: string;
  password: string;
  crp: string;
  cpf: string;
}
