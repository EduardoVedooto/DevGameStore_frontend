import styled from "styled-components";
import {Link} from "react-router-dom";

export default function Game({image,title, description, price, id}) {
    return (
        <ThisGame>
            <GameImg>
                <img src={image} alt = {title}/>
            </GameImg>
            <GameInfo>
                <h2>{title.length > 29? `${title.slice(0, 29)}...` : title}</h2>
                <div className = "info">
                <h3>{`${description.slice(0, 100)}...`}</h3>
                </div>
                <SeeMore>
                    <h3>{(price/100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL'})}</h3>
                    <Link to={`/game/${id}`}><button>See more</button></Link>
                </SeeMore>
            </GameInfo>
        </ThisGame>
    )
}



const ThisGame = styled.div`
    margin-top:1.9rem;
    background-color: #171717;
    border-radius: 0.8rem;
    margin-right:5rem;
    margin-bottom:2.5rem;
`;

const GameImg = styled.div`
    height:20rem;
    width:100%;
    img{
        height:100%;
        width:100%;
        object-fit:fill;
        border-radius: 8px 8px 0 0;
    }
`;

const GameInfo = styled.div`
    width:100%;
    padding:2.1rem 1.5rem 1.5rem 1.5rem;
    text-overflow: ellipsis;
    h2{
        font-family: 'Rubik';
        font-weight:700;
        color:#FFF;
        font-size:2.2rem;
    }

    .info{
        height:5.4rem;
        text-overflow: ellipsis;
        
        h3{
            font-family: 'Rubik';
            font-weight:400;
            color:#FFF;
            font-size:1.8rem;
            margin-top:0.7rem;
        }

    }
`;

const SeeMore = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    margin-top:15px;
    
    h3{
    font-family: 'Rubik';
    font-weight:700;
    color:#DA0037;
    font-size:2rem;
    }

    button{
    box-sizing:border-box;
    background: #DA0037;
    border-radius: 5px;
    font-family: 'Rubik';
    font-size: 1.6rem;
    color:#FFF;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    border:none;
    outline:none;
    padding: 10px;
    cursor: pointer;
    }
`;