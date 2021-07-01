import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from '../../components/Loading';
import Section from "../../components/Section";

export default function Dashboard() {
    const [games, setGames] = useState([]);
    const [isWaitingServer, setWaitingServer] = useState(true);
    
    useEffect(() => {
        const request = axios.get('https://dev-game-store.herokuapp.com/dashboard')
        request.then(response => {
            setGames(response.data);
            setWaitingServer(false);
        });
        request.catch((error) => {
            alert(error.response.data);
            setWaitingServer(false);
        });
    }, []);

    if (isWaitingServer) {
        return (
          <>
            <Loading/>
          </>
        );
      }

    return (
        <Container>
            <Section name={"Horror"} array={games.filter(e => e.category === "Horror")} category={"Horror"} />
            <Section name={"Adventure"} array={games.filter(e => e.category === "Adventure")} category={"Adventure"} />
            <Section name={"Action"} array={games.filter(e => e.category === "Action")} category={"Action"} />
        </Container>
    )
}

const Container = styled.div`
    height:100%;
    width:100%;
    background-color:#444444;
    margin-top:12rem;
    @media(max-width: 614px) {
    margin-top:10rem;
  }
`;
