const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //eslint-disable-line

const Validate = (data, from) => {
  if (from === "signup") {
    const { name, email, password, confirmPassword } = data;
    if (name.length > 40 || name.trim().length === 0) {
      return {
        result: false,
        message: "Nome não pode passar de 40 caracteres e não pode ser vazio"
      };
    }
    if (!validEmail.test(email)) {
      return {
        result: false,
        message: "Email inválido"
      };
    }
    if (password.length < 6) {
      return {
        result: false,
        message: "Senha de, no mínimo, 6 caracteres"
      };
    }
    if (password !== confirmPassword) {
      return {
        result: false,
        message: "As senhas não são iguais"
      };
    }
  }
  return { result: true };
}

export default Validate;