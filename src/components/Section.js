import styled from "styled-components";
import Game from './Game';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';


export default function Section({ name, array, category }) {

  function shuffle() {
    return Math.random() - 0.5;
  }

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

  return (
    <ThisSection>
      <ThisCategory>
        <TitleHolder><h1 className={name}>{`Trending in ${name}`}</h1></TitleHolder>
        <Link to={`/games/${category}`}><button>See more from this category</button></Link>
      </ThisCategory>
      <Carousel responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        showDots={true}
      >
        {array.sort(shuffle).slice(0, 5).map((e, i) =>
          <Game key={i} image={e.image} title={e.name} description={e.description} price={e.price} id={e.id} />
        )}
      </Carousel>
    </ThisSection>
  )
}

const ThisSection = styled.div`
    width:100%;
    margin:0 auto;
    margin-top: 5rem;
    padding-left:5%;
    @media(max-width: 614px) {
    padding-left: 0;
  }
`;

const ThisCategory = styled.div`
width:100%;
display:flex;
align-items: center;
justify-content: space-between;

  a{
    @media(max-width: 614px) {
    width: 100%;
  }

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
    margin-right:5rem;
    @media(max-width: 614px) {
    width: 100%;
    border-radius:0;
  }
  }
  
  @media(max-width: 614px) {
    flex-direction: column;
  }
`;

const TitleHolder = styled.div`
  padding:1.5rem;
  background-color:var(--color-darker);
  border-radius:2rem;
  display:flex;
  text-align: center;

  h1{
        font-weight:700;
        color:#FFF;
        font-size:4rem;
        &.Horror{
            font-family:'Creepster';
        }
        &.Adventure{
            font-family:'Kranky';
        }
        &.Action{
            font-family:'Nosifer';
            font-size:3rem;
        }
    }
    @media(max-width: 614px) {
    width: 100%;
    border-radius:none;
    justify-content: center;
    border-radius:0;
  }
`;

