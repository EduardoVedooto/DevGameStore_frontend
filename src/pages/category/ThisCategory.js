import styled from "styled-components";
import axios from "axios";
import Game from "../../components/Game";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function ThisCategory(){
    const { category } = useParams()
    const [games, setGames] = useState();
    console.log(games);

    useEffect(() => {
        const request = axios.get(`http://localhost:4000/games/${category}`)
        request.then(response => {
            setGames(response.data);
        });
        request.catch((error) => {
            alert(error.response.data);
        });
    }, [category]);

    return(
       <Container>
           <TitleHolder>
               <h1 className = {category}>{category}</h1>
           </TitleHolder>
       </Container>
    )
}

const Container = styled.div`
    width:100%;
    margin-top: 7rem;
`;

const TitleHolder = styled.div`
    width:100%;
    text-align: center;
    h1{
        font-size:7rem;
        color:#FFF;

        &.Horror{
            font-family:'Creepster';
        }
        &.Adventure{
            font-family:'Kranky';
        }
        &.Action{
            font-family:'Nosifer';
        }
    }
`;