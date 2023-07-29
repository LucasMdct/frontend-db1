/**
 * Expressão regular para verificar se o e-mail está no formato válido.
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const validateEmail = (text) => {
  const valid = EMAIL_REGEX.test(text);
  if (!valid) {
    return 'E-mail inválido';
  }
  return undefined;
};

const PASSWORD_REGEX = /^.{8,16}$/;

export const validatePassword = (text) => {
  const valid = PASSWORD_REGEX.test(text);
  if (!valid) {
    return 'Senha é obrigatória';
  }
  return undefined;
};
const NAME_REGEX = /^.{3,200}$/;
export const validateName = (text) => {
  const valid = NAME_REGEX.test(text);
  if (!valid) {
    return 'O nome é obrigatório';
  }
  return undefined;
};
