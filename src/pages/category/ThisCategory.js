import styled from "styled-components";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Game from "../../components/Game";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Loading from '../../components/Loading';
import Pacman from '../../components/pacman/Pacman';

export default function ThisCategory() {
    const { category } = useParams()
    const [games, setGames] = useState([]);
    const [isWaitingServer, setWaitingServer] = useState(true);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 614, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        const request = axios.get(`https://dev-game-store.herokuapp.com/games/${category}`)
        request.then(response => {
            setGames(response.data);
            setWaitingServer(false);
        });
        request.catch((error) => {
            alert(error.response.data);
            setWaitingServer(false);
        });
    }, [category]);

    if (isWaitingServer) {
        return (
            <>
                <Loading />
            </>
        );
    }

    if (games.length === 0) {
        return (
            <>
                <Pacman message="No game for this category" />
            </>
        );
    }


    return (
        <>
            <Container>
                <TitleHolder>
                    <h1 className={category}>{category}</h1>
                    <ContentHolder>
                        <Carousel responsive={responsive}
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={4000}
                            showDots={true}
                            renderButtonGroupOutside={true}
                        >
                            {games.map((e, i) =>
                                <Game key={i} image={e.image} title={e.name} description={e.description} price={e.price} id={e.id} />
                            )}
                        </Carousel>
                    </ContentHolder>
                </TitleHolder>
            </Container>
        </>
    )
}

const Container = styled.div`
    width:100%;
    margin-top: 12rem;
    padding-left:5%;
    padding-right:3%;
    min-height: calc(100vh - 36.8rem);
    @media(max-width: 614px) {
    padding:0;
  }
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

const ContentHolder = styled.div`
    width:100%;
    margin:0 auto;
    margin-top: 5rem;
    padding-left:5%;
    padding-right:5%;
    @media(max-width: 614px) {
    padding:0;
    margin-top:2.5rem;
  }
`;