import { SigninContainer } from "./style";
import { Form, FormTitle, Button, Input } from "../../styles/FormStyles";
import Loader from "react-loader-spinner";
import { useState } from "react";
import Validate from "../../utils/ValidateInputs";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";

export default function Signin() {
  const [isWaitingServer, setWaitingServer] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleChange({ target }) {
    const { placeholder, value } = target;
    if (placeholder === "E-mail") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = Validate({ email, password }, "signin");
    if (!validation.result) {
      window.alert(validation.message);
      return;
    }
    setWaitingServer(true);

    const promise = axios.post("https://dev-game-store.herokuapp.com/sign-in", { email, password });
    promise.then(({ data }) => {
      sessionStorage.setItem("session", JSON.stringify(data));
      setWaitingServer(false);
      history.push("/");
    });
    promise.catch(err => {
      setWaitingServer(false);
      if (err.response.status === 401) {
        window.alert(err.response.data);
      }
      console.error(err.response);
    });
  }

  return (
    <SigninContainer>
      <Header />
      <Form onSubmit={handleSubmit}>
        <FormTitle>Inicar sessão</FormTitle>
        <Input value={email} placeholder="E-mail" onChange={handleChange} required />
        <Input value={password} placeholder="Senha" type="password" onChange={handleChange} required />
        <Button disabled={isWaitingServer}> {isWaitingServer ?
          <Loader
            type="ThreeDots"
            color="#171717"
            height={20}
            width={75}
          /> :
          "Entrar"
        }</Button>
      </Form>
    </SigninContainer>
  );
}