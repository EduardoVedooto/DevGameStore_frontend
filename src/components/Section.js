import styled from "styled-components";
import Game from './Game';

export default function Section({name, array}){
    return(
        <ThisSection>
            <h1>{name}</h1>
            <GamesHolder>
              <Game array = {array}/>
              <Game array = {array}/>
              <Game array = {array}/>
              <Game array = {array}/>
            </GamesHolder>
        </ThisSection>
    )
}

const ThisSection = styled.div`
    width:100%;
    margin:0 auto;
    margin-top: 5rem;
    h1{
        margin-left:3rem;
        font-family: 'Rubik';
        font-weight:700;
        color:#FFF;
        font-size:2.2rem;
    }
`;

const GamesHolder = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
`;

