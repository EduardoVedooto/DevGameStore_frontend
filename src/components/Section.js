import styled from "styled-components";
import Game from './Game';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Link} from 'react-router-dom';


export default function Section({name, array, category}){

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
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

    return(
        <ThisSection>
            <ThisCategory>
              <h1>{name}</h1>
              <Link to={`/${category}`}><button>See more from this category</button></Link>
            </ThisCategory>
            <Carousel responsive = {responsive}
            infinite = {true}
            autoPlay = {true}
            autoPlaySpeed = {4000}
            showDots = {true}
            >
              {array.sort(shuffle).slice(0, 5).map((e)=>
                <Game image={e.image} title={e.name} description={e.description} price={e.price} id = {e.id} />
              )}
           
            </Carousel>
        </ThisSection>
    )
}

const ThisSection = styled.div`
    width:100%;
    margin:0 auto;
    margin-top: 5rem;
`;

const ThisCategory = styled.div`
width:100%;
display:flex;
align-items: center;
justify-content: space-between;
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
  }

  h1{
        margin-left:3rem;
        font-family: 'Rubik';
        font-weight:700;
        color:#FFF;
        font-size:2.7rem;
    }
`;

