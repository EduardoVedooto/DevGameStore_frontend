import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";

const Footer = () => {

  function openNewTab(a) {
    window.open(a, "_blank");
  }

  return (
    <Container>
      <Social>
        <h1>Nossas redes sociais</h1>
        <div className="holder">
          <AiFillInstagram className="icon"
            onClick={() => openNewTab("http://instagram.com")}
          />
          <AiFillTwitterCircle className="icon"
            onClick={() => openNewTab("http://twitter.com")}
          />
          <AiFillFacebook className="icon"
            onClick={() => openNewTab("http://facebook.com")}
          />
        </div>
      </Social>
      <Social>
        <Link to="/contact-us"><h1>Fale conosco</h1></Link>
      </Social>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  background-color: #171717;
  height: 19.8rem;
  width:100%;
  margin-top: 5rem;
  display:flex;
`;

const Social = styled.div`
  width:50%;
  height:100%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1{
  font-family: 'Rubik';
  font-weight: bold;
  font-size: 2.2rem;
  color: #FFFFFF;
  }

  .holder{
    margin-top:2rem;
    width:25%;
    display:flex;
    color:white;
    align-items: center;
    justify-content: space-between;
  }

  .icon{
    width:5rem;
    height:5rem;
    cursor: pointer;
  }
`;