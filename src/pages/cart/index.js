import { CartContainer, ListItens, ListTitle, Item, OrderInfo, TitleEmptyList, CartContainerEmpty, Button, GameCover, GameTitle, GameInfo, RemoveButton, ItemFooter, GamePrice, UserOff, TitleOff, OrderTitle } from "./style";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cart() {

  const [gamesList, setGamesList] = useState();
  const [isWaitingServer, setWaitingServer] = useState(true);
  const gamesIds = JSON.parse(sessionStorage.getItem("cart"));
  const user = JSON.parse(sessionStorage.getItem("session"))?.user;
  const history = useHistory();

  useEffect(() => {
    if (gamesIds) {
      const promise = axios.post("http://localhost:4000/cart", {
        ids: gamesIds || []
      });
      promise.then(({ data }) => {
        setWaitingServer(false);
        console.log(data);
        setGamesList(data);
      });
      promise.catch(err => {
        setWaitingServer(false);
        console.error(err.response.data);
      });
    }
  }, []); //eslint-disable-line

  if (!gamesIds || !gamesIds.length) {
    return (
      <CartContainerEmpty>
        <Header />
        <TitleEmptyList>Seu carrinho está vazio</TitleEmptyList>
        <Button onClick={() => history.push("/")}>Voltar para home</Button>
      </CartContainerEmpty>
    );
  }

  if (isWaitingServer) {
    return (
      <CartContainerEmpty>
        <Header />
        <Loader
          type="MutatingDots"
          color="#DA0037"
          secondaryColor="#171717"
          height={100}
          width={100}
        />
      </CartContainerEmpty>
    );
  }

  return (
    <CartContainer>
      <Header />
      <ListItens>
        <ListTitle>Seu carrinho</ListTitle>
        {gamesList && gamesList.map(game => (
          <Item key={game.id}>
            <GameCover src={game.image} alt={game.name} />
            <GameInfo>
              <GameTitle>{game.name}</GameTitle>
              <ItemFooter>
                <GamePrice>{(game.price / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</GamePrice>
                <RemoveButton><FaTrashAlt /></RemoveButton>
              </ItemFooter>
            </GameInfo>
          </Item>
        ))}
      </ListItens>
      <OrderInfo>
        <OrderTitle>Pedido</OrderTitle>
        {user ?
          <></>
          :
          <UserOff>
            <TitleOff>
              <strong>Você está offline</strong> 😕<br />
              Faça <Link to="/sign-in">login</Link>, ou
              <Link to="/sign-up"> cadastre-se</Link> para continuar com a compra!
            </TitleOff>
          </UserOff>
        }
      </OrderInfo>
    </CartContainer >
  );
}