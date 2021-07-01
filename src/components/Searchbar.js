import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';

export default function Searchbar() {
    const [gameList, setGameList] = useState([]);
    const [searching, setSearching] = useState(false);
    const [value, setValue] = useState("");
    let searchRef = useRef();

    useEffect(() => {
        if (value.length === 0) {
            setSearching(false);
            return;
        }
        const request = axios.get(`http://localhost:4000/gamelist?gamename=${value}`);
        request.then((response) => {
            setGameList(response.data);
            setSearching(true);
        });
    }, [value]);

    useEffect(() => {
        let handler = (event) => {
            if (!searchRef.current.contains(event.target)) {
                setGameList([]);
                setValue("");
            }
        };

        document.addEventListener("mouseup", handler);

        return () => {
            document.removeEventListener("mouseup", handler);
        };
    });


    return (
        <SearchHolder ref={searchRef}>
            <Input
                placeholder="Search for a game..."
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <Dropdown show={searching}>
                {gameList.map((e, i) =>
                    <Link to={`/game/${e.id}`}>
                        <div key = {i} className="element">
                            <div className="imgholder"><img src={e.image} alt={e.name} /></div>
                            <div className="textholder">{e.name}</div>
                        </div>
                    </Link>
                )}
            </Dropdown>
        </SearchHolder>
    )
}

const Input = styled.input`
    width:100%;
    height: 5rem;
    padding:1rem;
    border-radius: .5rem;
    outline: none;
    border: none;
    font-size: 1.8rem;
  @media(max-width: 614px) {
    width: 80%;
  }
`;

const Dropdown = styled.div`
    position:absolute;
    width:100%;
    margin-top:4.7rem;
    border-radius: .5rem;
    display: ${props => props.show ? "flex" : "none"};
    flex-direction:column;
    @media(max-width:614px) {
        width:80%;
    }
    }
    .element{
        display: flex;
        border: 0.1rem solid #444;
        background-color:#000;
        align-items:center;
        width:100%;
        @media(max-width: 614px) {
        width:100%;
    }
    .imgholder{
        width:30%;
        height:100%;
        @media(max-width: 614px) {
        display:none;
    }
        img{
        width:100%;
        height:100%;
        object-fit: cover;
    }
 }

    .textholder{
    padding: 1rem;
    color:#FFF;
    font-family:'Rubik';
    font-size:2rem;
    width:70%;
    height:100%;
    border:none;
    margin-left:1rem;
    text-align:center;
    display: flex;
    align-items: center;
    justify-content: center;
    @media(max-width: 614px) {
        height:70%;
        width:100%;   
    }
    }
}
    
`;

const SearchHolder = styled.div`
    display:flex;
    flex-direction: column;
    width: 40rem;
    position:relative;
    align-items: center;
    
`;