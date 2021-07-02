import styled, { createGlobalStyle } from "styled-components";
import Modal from "react-modal";
import { AiFillHome } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPersonPlusFill, BsFillPersonLinesFill } from "react-icons/bs";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";

export default function MobileModal(props) {
  const { open, setOpen } = props;
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const session = JSON.parse(sessionStorage.getItem("session"));

  useEffect(() => {
    if (session) {
      setLoggedIn(true);
    }
  }, []);//eslint-disable-line

  const Logout = () => {
    sessionStorage.removeItem("session");
    history.push("/");
    window.location.reload();
  }

  return (
    <Modal
      className="mobileMenu"
      overlayClassName="ov_mobileMenu"
      isOpen={open}
      onRequestClose={() => setOpen(false)}
    >
      <ModalStyles />
      <MenuList>
        <ListItem onClick={() => history.push("/")}><AiFillHome />Home</ListItem>
        <ListItem onClick={() => history.push("/cart")}><FaShoppingCart />Carrinho</ListItem>
        {
          loggedIn ?
            <>
              <ListItem onClick={() => history.push(`/profile/${session.user.id}`)}><BsFillPersonLinesFill />Perfil</ListItem>
              <ListItem onClick={Logout}><RiLogoutBoxFill />Sair</ListItem>
            </>
            :
            <>
              <ListItem onClick={() => history.push("/sign-up")}><BsFillPersonPlusFill />Cadastro</ListItem>
              <ListItem onClick={() => history.push("/sign-in")}><RiLoginBoxFill />Login</ListItem>
            </>
        }
      </MenuList>
    </Modal>
  );
}

const ModalStyles = createGlobalStyle`
  .mobileMenu {
    width: 80%;
    height: fit-content;
    outline: none;
    margin: auto;
    
  };
  .ov_mobileMenu {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200000;
    display: flex;
    background-color: rgba(0,0,0,.5);
    backdrop-filter: blur(10px);
  }
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const ListItem = styled.li`
  background-color: var(--color-darker);
  color: var(--color-light);
  border-radius: .5rem;
  font-size: 2rem;
  width: 100%;
  padding: 2.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  svg{
    width: 3rem;
    height: 3rem;
    color: var(--color-primary);
    margin-right: 2rem;
  }
`;