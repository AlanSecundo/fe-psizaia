// Teste da validação de senha corrigida

const testPassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const isValid = regex.test(password);

  console.log(`Senha: "${password}"`);
  console.log(`Válida: ${isValid}`);

  // Análise detalhada
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&]/.test(password);
  const hasMinLength = password.length >= 8;

  console.log(`- Minúscula: ${hasLowercase}`);
  console.log(`- Maiúscula: ${hasUppercase}`);
  console.log(`- Número: ${hasNumber}`);
  console.log(`- Especial: ${hasSpecial}`);
  console.log(`- Tamanho >= 8: ${hasMinLength}`);
  console.log("---");

  return isValid;
};

// Testes
console.log("=== Testando Validação de Senha ===");

// Senha que estava falhando
testPassword("DeVG#5xaz");

// Outras senhas para teste
testPassword("MinhaSenh@123");
testPassword("abc123"); // Muito curta
testPassword("abcdefgh"); // Sem maiúscula, número ou especial
testPassword("ABCDEFGH"); // Sem minúscula, número ou especial
testPassword("Abcdefgh"); // Sem número ou especial
testPassword("Abcdefg1"); // Sem especial
testPassword("Abcdefg@"); // Sem número
