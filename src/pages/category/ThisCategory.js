import styled from "styled-components";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Game from "../../components/Game";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Footer from "../../components/Footer";


export default function ThisCategory() {
    const { category } = useParams()
    const [games, setGames] = useState([]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        const request = axios.get(`https://dev-game-store.herokuapp.com/games/${category}`)
        request.then(response => {
            setGames(response.data);
        });
        request.catch((error) => {
            alert(error.response.data);
        });
    }, [category]);

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
            <Footer />
        </>
    )
}

const Container = styled.div`
    width:100%;
    margin-top: 7rem;
    padding-left:5%;
    padding-right:3%;
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
`;