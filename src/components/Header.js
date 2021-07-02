import styled from 'styled-components';
import Searchbar from './Searchbar';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { BsPersonFill, BsPersonPlusFill, BsFillPersonLinesFill } from "react-icons/bs";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ImSearch } from "react-icons/im";
import SearchModal from "./SearchModal.js";
import MobileModal from "./MobileMenu.js";


export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const session = JSON.parse(sessionStorage.getItem('session'));

  const openSearch = () => {
    setOpenModal(true);
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/">
          <Title>DGS</Title>
        </Link>
        <Searchbar />
        <Menu>
          {
            session ?
              <>
                <MenuItem open={open} setOpen={setOpen} img={session.user.picture} icon={<BsPersonFill />}><DropdownMenu setOpen={setOpen} user={session.user} /></MenuItem>
                <MenuItem icon={<FaShoppingCart />} to="/cart" />
              </>
              :
              <>
                <MenuItem open={open} setOpen={setOpen} icon={<BsPersonFill />}><DropdownMenu setOpen={setOpen} /></MenuItem>
                <MenuItem icon={<FaShoppingCart />} to="/cart" />
              </>

          }
        </Menu>
      </HeaderContent>
      <MobileContent>
        <SearchModal open={openModal} setOpen={setOpenModal} />
        <MobileModal open={openMenu} setOpen={setOpenMenu} />
        <ImSearch onClick={openSearch} />
        <Link to="/">
          <Title>DGS</Title>
        </Link>
        <GiHamburgerMenu onClick={() => setOpenMenu(true)} />
      </MobileContent>
    </HeaderContainer>
  );
}

function MenuItem(props) {
  const history = useHistory();

  return (
    <MenuItemStyle onClick={() => {
      if (props.to) {
        history.push(props.to)
      } else {
        props.setOpen(!props.open);
      }
    }
    }>
      <Icon>
        {props.img ?
          <img src={props.img} alt="Profile pic" />
          :
          props.icon}
      </Icon>

      {props.open && props.children}
    </MenuItemStyle>
  );
}

function DropdownMenu(props) {
  const user = props?.user;
  const history = useHistory();
  const dropdown = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => { document.removeEventListener("mousedown", handleClick) }
  }, []); //eslint-disable-line

  const handleClick = e => {
    if (!dropdown.current.contains(e.target)) props.setOpen(false);
  }

  const DropdownItem = props => {
    return (
      <DropdownItemStyle onClick={() => {
        if (props.to === "logout") {
          if (window.confirm("Do you wish to finish your session?")) {
            sessionStorage.removeItem("session");
            window.location.reload();
          }
        } else {
          history.push(props.to)
        }
      }}>
        <span>{props.icon}</span>
        {props.children}
      </DropdownItemStyle>
    );
  }

  return (
    <DropdownStyle ref={dropdown}>
      {user ?
        <>
          <DropdownItem to="/profile/:id" icon={<BsFillPersonLinesFill />}>Profile</DropdownItem>
          <DropdownItem to="logout" icon={<RiLogoutBoxFill />}>Logout</DropdownItem>
        </>
        :
        <>
          <DropdownItem to="/sign-up" icon={<BsPersonPlusFill />}>Sign up</DropdownItem>
          <DropdownItem to="/sign-in" icon={<RiLoginBoxFill />}>Sign in</DropdownItem>
        </>
      }
    </DropdownStyle>
  );
}



const HeaderContainer = styled.header`
  width: 100%;
  height: 10rem;
  background-color: var(--color-darker);
  display: flex;
  padding: 0 5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  @media(max-width: 750px) {
    padding: 0 2rem;
  }
`;

const HeaderContent = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media(max-width: 750px){
    display: none;
  }
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 3.2rem;
  transition: filter 300ms ease-in-out;
  :hover{
    filter: brightness(1.5);
  }

  @media(max-width: 750px){
    font-size: 4.2rem;
  }
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MenuItemStyle = styled.li`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  font-size: 1.6rem;

  svg{
    width: 80%;
    height: 80%;
    color: var(--color-primary);
  }
  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Icon = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 0 .7rem;
    transition: background 300ms ease-in-out;
    cursor: pointer;
    &:hover{
      background-color: var(--color-dark);
    }
`;

const DropdownStyle = styled.div`
  position: absolute;
  top: 10.5rem;
  transform: translateX(-4.8rem);
  width: 15rem;
  background-color: var(--color-darker);
  border-radius: .5rem;
  padding: 1rem;
  overflow: hidden;
  box-shadow: 0 0 1rem rgba(0,0,0,.5);
`;

const DropdownItemStyle = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  border-radius: .5rem;
  transition: background 300ms ease-in-out;
  padding: .5rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-light);
  cursor: pointer;
  &:hover{
    background-color: var(--color-primary);
    span {
      background-color: var(--color-primary);
      filter:brightness(1.5);
    }
  }
  a{
    height: inherit;
    width: 100%;
  }
  span {
    height: 3rem;
    min-width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: .8rem;
    background-color: var(--color-dark);
    border-radius: 50%;
    transition: background 300ms ease-in-out, filter 300ms ease-in-out;


    svg{
      color: var(--color-darker);
      width: 70%;
      height: 70%;
    }
  }
`;

const MobileContent = styled.div`
  display: none;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  svg{
    width: 4.5rem;
    height: 4.5rem;
    color: var(--color-dark);
  }
  @media(max-width: 750px){
    display: flex;
  }
`;
