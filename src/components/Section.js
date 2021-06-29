import styled from "styled-components";
import Game from './Game';

export default function Section({name, array}){
    return(
        <ThisSection>
            <h1>{name}</h1>
            <GamesHolder>
              {array.slice(0, 5).map((e)=>
                <Game image={e.image} title={e.name} description={e.description} price={e.price} id = {e.id} />
              )}
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
        font-size:2.7rem;
    }
`;

const GamesHolder = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    overflow-x: scroll;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
  display: none;
}
`;

