import { ProfileContainer, Buttons, Button, Label, UserInfo, Input, LeftPanel, ProfilePicture, Name, RightPanel, InputWrapper, SaveButton } from "./style";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import Validate from "../../utils/ValidateInputs";
import axios from "axios";

export default function Profile() {
  const user = JSON.parse(sessionStorage.getItem("session"))?.user;
  const token = JSON.parse(sessionStorage.getItem("session"))?.token;
  const [isDisable, setDisable] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      window.alert("Você está desconectado, por favor, faça login novamente!")
      sessionStorage.removeItem("session");
      history.push("/sign-in");
    } else {
      setName(user.name);
      setEmail(user.email);
      setPicture(user.picture);
    }
  }, [isDisable]); //eslint-disable-line

  const EnableInputs = () => {

    if (!isDisable) {
      if (window.confirm("Deseja cancelar a edição?")) {
        setDisable(true);
      }
    } else {
      setDisable(false);

    }

  }

  const handleChange = ({ target }) => {
    const { id, value } = target;

    if (id === "name") {
      setName(value);
      return;
    }
    if (id === "email") {
      setEmail(value);
      return
    }
    if (id === "picture") {
      setPicture(value);
      return;
    };
  }

  const UpdateUser = () => {
    const validation = Validate({ name, email }, "update");
    if (!validation.result) {
      return window.alert(validation.message);
    }

    const body = {
      name,
      email,
      picture
    }

    const promise = axios.put("https://dev-game-store.herokuapp.com/update-user", { ...body }, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    promise.then(({ data }) => {
      const session = JSON.parse(sessionStorage.getItem("session"));
      session.user = data
      sessionStorage.setItem("session", JSON.stringify(session));
      window.alert("Usuário atualizado");
      history.push("/");
    });
    promise.catch(err => {
      console.error(err.response);
      if (err.response.status === 400) {
        window.alert(err.response.data.message);
      }
    });

  }

  return (
    <>
      <Header />
      <ProfileContainer>
        <LeftPanel>
          {user && user.picture ?
            <ProfilePicture src={user.picture} alt="Foto do perfil" />
            :
            <IoPersonCircleSharp />
          }
          <Name>{user && user.name}</Name>
        </LeftPanel>
        <RightPanel>
          <UserInfo>
            <InputWrapper>
              <Label htmlFor="name">Nome</Label>
              <Input disabled={isDisable} id="name" value={name} onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="email">E-mail</Label>
              <Input disabled={isDisable} id="email" value={email} onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="picture">Foto do perfil</Label>
              <Input disabled={isDisable} id="picture" value={picture || ""} placeholder={picture || "URL"} onChange={handleChange} />
            </InputWrapper>
          </UserInfo>
          <Buttons>
            <Button onClick={EnableInputs} >{isDisable ? "Editar" : "Cancelar"}</Button>
            <SaveButton onClick={UpdateUser} isDisable={isDisable}>Salvar</SaveButton>
          </Buttons>
        </RightPanel>
      </ProfileContainer>
      <Footer />
    </>
  );
}