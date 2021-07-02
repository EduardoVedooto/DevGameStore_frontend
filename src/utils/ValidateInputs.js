const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //eslint-disable-line
const validCardNumber = /^[0-9]{16}$/; //eslint-disable-line
const validName = /^[A-Za-zÀ-úç'\s]+$/; //eslint-disable-line
const validCVV = /^[0-9]{3,4}$/; //eslint-disable-line

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

  else if (from === "signin") {
    const { email, password } = data;
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
  }

  else if (from === "checkout") {
    const { number, name, cvv, month, year } = data;
    if (!validCardNumber.test(number)) {
      return {
        result: false,
        message: "Número do cartão deve conter 16 números \n(Sem Letras ou espaços)"
      }
    }
    if (!validName.test(name) || !name.trim().length) {
      return {
        result: false,
        message: "Nome inválido"
      }
    }
    if (!validCVV.test(cvv)) {
      return {
        result: false,
        message: "Códido de segurança inválido"
      }
    }
    if (month < 1 || month > 12) {
      return {
        result: false,
        message: "Mês de validade inválido"
      }
    }
    if (year < 2021 || year > 2039) {
      return {
        result: false,
        message: "Ano de validade inválido"
      }
    }
  }

  else if (from === "update") {
    const { name, email } = data;

    if (name.length > 40 || name.trim().length === 0) {
      return {
        result: false,
        message: "nome inválido"
      }
    }
    if (!validEmail.test(email)) {
      return {
        result: false,
        message: "E-mail inválido"
      }
    }
  }
  return { result: true };
}

export default Validate;