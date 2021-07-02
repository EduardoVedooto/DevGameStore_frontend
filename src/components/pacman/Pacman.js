import pacman from "./pacman.gif";
import styled from "styled-components";
export default function Sadface({message}) {
  return (
    <Container>
      <img height="200" width="200" src={pacman} alt="sad"></img>
      <div className = "message">{message}</div>
    </Container>
  );
}

const Container = styled.main`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    margin-top: 10rem;
    min-height: calc(100vh - 34.8rem);
    font-family: 'Rubik';
    color:#DA0037;
    font-size: 3rem;
    font-weight: bold;

    .message{
        background-color:#000;
        width:100%;
    }
`;