import styled from "styled-components";

export default function Game() {
    return (
        <ThisGame>
            <GameImg>
                {/*image*/}
                <img src="https://assets.nuuvem.com/image/upload/t_banner_big/v1/products/59482a8821624867e000075b/banners/rvwoxh3kv2ewswdij8cs.jpg"/>
            </GameImg>
            <GameInfo>
                {/*title*/}
                {/*description*/}
                <h2>The Evil Within</h2>
                <h3>Descrição</h3>
                <SeeMore>
                    <h3>R$ 19,90</h3>
                    <button>See more</button>
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
`;

const GameImg = styled.div`
    img{
        width:100%;
        object-fit:fill;
        border-radius: 8px 8px 0 0;
    }
`;

const GameInfo = styled.div`
    width:100%;
    padding:2.1rem 1.5rem 1.5rem 0.9rem;
    h2{
        font-family: 'Rubik';
        font-weight:700;
        color:#FFF;
        font-size:2.2rem;
    }
    h3{
        font-family: 'Rubik';
        font-weight:400;
        color:#FFF;
        font-size:1.8rem;
        margin-top:0.7rem;
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
    }
`;