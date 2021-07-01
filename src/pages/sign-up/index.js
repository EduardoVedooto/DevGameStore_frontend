import { SignupContainer } from "./style";
import { Form, Input, Button, FormTitle } from "../../styles/FormStyles";
import { useState } from "react";
import Validate from "../../utils/ValidateInputs";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import Header from "../../components/Header";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [isWaitingServer, setWaitingServer] = useState(false);
  const history = useHistory();

  function handleChange({ target }) {
    const { placeholder, value } = target;
    if (placeholder === "Nome") {
      setName(value);
    } else if (placeholder === "E-mail") {
      setEmail(value);
    } else if (placeholder === "Senha") {
      setPassword(value);
    } else if (placeholder === "Confirmar senha") {
      setConfirmPassword(value);
    } else {
      setPicture(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setWaitingServer(true);
    const validation = Validate({ name, email, password, confirmPassword }, "signup");
    if (!validation.result) {
      setWaitingServer(false);
      window.alert(validation.message);
      return;
    }

    const promise = axios.post("https://dev-game-store.herokuapp.com/sign-up", { name, email, password, picture });
    promise.then(() => {
      setWaitingServer(false);
      history.push("/sign-in");
    });
    promise.catch(err => {
      setWaitingServer(false);
      if (err.response.status === 401) {
        window.alert("E-mail já cadastrado");
      }

      console.log(err.response);
    });
  }



  return (
    <SignupContainer>
      <Header />
      <Form onSubmit={handleSubmit}>
        <FormTitle>Novo usuário</FormTitle>
        <Input value={name} placeholder="Nome" onChange={handleChange} required />
        <Input value={email} placeholder="E-mail" onChange={handleChange} required />
        <Input value={password} placeholder="Senha" type="password" onChange={handleChange} required />
        <Input value={confirmPassword} placeholder="Confirmar senha" type="password" onChange={handleChange} required />
        <Input value={picture} placeholder="Imagem de perfil (URL)" onChange={handleChange} />
        <Button disabled={isWaitingServer}> {isWaitingServer ?
          <Loader
            type="ThreeDots"
            color="#171717"
            height={20}
            width={75}
          /> :
          "Cadastrar-se"
        }</Button>
      </Form>
    </SignupContainer>
  );
}