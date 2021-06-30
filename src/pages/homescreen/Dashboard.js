import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Section from "../../components/Section";
import Footer from "../../components/Footer";

export default function Dashboard(){
    const [games, setGames] = useState([]);

    useEffect(() => {
        const request = axios.get('http://localhost:4000/dashboard')
        request.then(response => {
            setGames(response.data);
        });
        request.catch((error) => {
            alert(error.response.data);
        });
    }, []);
    return(
        <Container>
            <Section name ={"Horror"} array = {games.filter(e => e.category === "Horror")} category = {"Horror"}/>
            <Section name ={"Adventure"} array = {games.filter(e => e.category === "Adventure")} category = {"Adventure"}/>
            <Section name ={"Action"} array = {games.filter(e => e.category === "Action")} category = {"Action"}/>
            <Footer/>
        </Container>
    )
}

const Container = styled.div`
    height:100%;
    width:100%;
    background-color:#444444;
    margin-top:7rem;
`;