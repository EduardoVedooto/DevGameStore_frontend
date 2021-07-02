import sadface from "./sadface.png";
import styled from "styled-components";
export default function Sadface({message}) {
  return (
    <Container>
      <img height="150" width="150" src={sadface} alt="sad"></img>
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
    font-family: 'Arial';
    color:#DA0037;
    font-size: 3rem;
    font-weight: bold;

    .message{
        background-color:#000;
        width:100%;
    }
`;