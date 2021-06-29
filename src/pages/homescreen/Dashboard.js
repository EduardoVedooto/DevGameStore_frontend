import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Section from "../../components/Section";

export default function Dashboard(){
    const [games, setGames] = useState([]);

    useEffect(() => {
        console.log("Hello world!")
    }, []);
    return(
        <Container>
            <Section name ={"Terror"} array = {"Teste"}/>
            <Section name ={"Terror"} array = {"Teste"}/>
            <Section name ={"Terror"} array = {"Teste"}/>
        </Container>
    )
}

const Container = styled.div`
    min-height:100vh;
    min-width:100vw;
    background-color:#444444;
    margin-top:7rem;
    padding-left:10%;
    padding-right:10%;
`;