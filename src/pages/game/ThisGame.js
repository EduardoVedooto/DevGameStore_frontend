import styled from "styled-components";
import axios from "axios";
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import Loading from '../../components/Loading';
import Pacman from '../../components/pacman/Pacman';

export default function ThisGame() {
    const { id } = useParams()
    const [game, setGame] = useState([]);
    const history = useHistory();
    const [isWaitingServer, setWaitingServer] = useState(true);

    useEffect(() => {
        const request = axios.get(`https://dev-game-store.herokuapp.com/game/${id}`)
        request.then(response => {
            setGame(response.data);
            setWaitingServer(false);
        });
        request.catch((error) => {
            setWaitingServer(false);
            console.log(error.response.data);
            alert(error.response.data);
        });
    }, [id]);

    const addGame = () => {
        const gamesSelected = JSON.parse(sessionStorage.getItem("cart"));
        if (gamesSelected) {
            if (gamesSelected.find(game => game === id)) {
                if (window.confirm("Este jogo já está no seu carrinho\nDeseja removê-lo?")) {
                    gamesSelected.splice(gamesSelected.indexOf(id), 1);
                    sessionStorage.setItem("cart", JSON.stringify(gamesSelected));
                }
            }
            else {
                gamesSelected.push(id);
                sessionStorage.setItem("cart", JSON.stringify(gamesSelected));
            }
        } else {
            sessionStorage.setItem("cart", JSON.stringify([id]));
        }
        history.push('/cart');
    }

    if (isWaitingServer) {
        return (
            <>
                <Loading />
            </>
        );
    }

    if (game.length === 0) {
        return (
            <>
                <Pacman message="No game found" />
            </>
        );
    }


    return (
        <>
            <Container style={{
                backgroundImage: `url('${game.background}')`
            }}>
                <GameHolder>
                    <TitleHolder><h1>{game.name}</h1></TitleHolder>
                    <GameInfo>
                        <ImgHolder>
                            <img src={game.image} alt={game.name} />
                        </ImgHolder>
                        <InfoHolder>
                            <h2>{game.description}</h2>
                        </InfoHolder>
                    </GameInfo>
                </GameHolder>
            </Container>
            <ButtonHolder onClick={addGame}>
                <AddToChart><TiShoppingCart /><h1>Gostou desse jogo? Adicione ao seu carrinho!</h1></AddToChart>
            </ButtonHolder>
        </>

    )
}

const Container = styled.div`
    width:100%;
    margin-top:10rem;
    background-repeat: no-repeat;
    background-size:100% 40rem;
    background-position: center 0;
    @media(max-width: 614px) {
    background-size:0;
  }
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
    @media(max-width: 614px) {
    width: 100%;
  }
`;

const TitleHolder = styled.div`
  padding:1.5rem;
  width:100%;
  background-color:var(--color-darker);
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
    @media(max-width: 614px) {
    width: 100%;
    margin-top:2rem;
  }
`;

const ImgHolder = styled.div`
    width:100%;
    height:15rem;
    display:flex;
    justify-content: center;
    @media(max-width: 614px) {
    img{
        width:100%;
    }
  }
`;

const InfoHolder = styled.div`
    padding:2rem;
    border-radius:2rem;
    background-color:var(--color-darker);
    margin-top:2rem;
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    text-align:justify;
    line-height: 3rem;
    h2{
        font-family:'Rubik';
        font-size:2rem;
        color:#FFFFFF;
    }
    @media(max-width: 614px) {
    border-radius:0;
  }
`;

const AddToChart = styled.button`
    justify-self: center;
    box-sizing:border-box;
    background: #DA0037;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    border:none;
    outline:none;
    padding: 2rem;
    cursor: pointer;
    font-family: 'Rubik';
    font-size: 3rem;
    color:#FFF;
    h1{
    margin-left:1rem;
    }
    @media(max-width: 614px) {
    border-radius:0;
    width:100%;
  }
`;

const ButtonHolder = styled.div`
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-top:2rem;

    a{
        @media(max-width: 614px) {
        width: 100%;
    }
 }
`;
