import styled from "styled-components";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
export default function ThisGame() {
    const { id } = useParams()
    const [game, setGame] = useState([]);
    console.log(game.background);

    useEffect(() => {
        const request = axios.get(`http://localhost:4000/game/${id}`)
        request.then(response => {
            setGame(response.data);
        });
        request.catch((error) => {
            alert(error.response.data);
        });
    }, [id]);

    return (
        <>
            <Container style={{
                    backgroundImage: `url('${game.background}')`
                }}>
                <GameHolder>
                    <TitleHolder><h1>{game.name}</h1></TitleHolder>
                    <GameInfo>
                        <ImgHolder>
                        <img src={game.image}/>
                        </ImgHolder>
                        <InfoHolder>
                            <h2>{game.description}</h2>
                        </InfoHolder>
                    </GameInfo>
                </GameHolder>
            </Container>
            <Footer />
        </>

    )
}

const Container = styled.div`
    width:100%;
    height:100vh;
    margin-top:7.5rem;
    background-repeat: no-repeat;
`;

const GameHolder = styled.div`
    margin:0 auto;
    text-align:center;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
        font-family:'Rubik';
        color:#FFF;
        font-size:3.5rem;
    }
`;

const TitleHolder = styled.div`
  padding:1.5rem;
  width:100%;
  background-color:#000;
  border-radius:0 0 10rem 10rem;
  display:flex;
  text-align: center;
  justify-content: center;
  h1{
        font-weight:700;
        color:#FFF;
        font-size:4rem;
    }
`;

const GameInfo = styled.div`
    width:50%;
    display:flex;
    flex-direction: column;
    border-radius:10rem;
    justify-content: center;
    margin-top:25rem;
`;

const ImgHolder = styled.div`
    width:100%;
    height:15rem;
    display:flex;
    justify-content: center;
`;

const InfoHolder = styled.div`
    background-color:#444;
    margin-top:10rem;
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    h2{
        font-family:'Rubik';
        font-size:2rem;
        color:#FFFFFF;
    }
`;