import { CartContainer, ListItens, ListTitle, Item, OrderInfo, TitleEmptyList, CartContainerEmpty, Button, GameCover, GameTitle, GameInfo, RemoveButton, ItemFooter, GamePrice, UserOff, TitleOff, OrderTitle, UserOn, TotalPrice, PaymentMethods, customStyles, ListHeader } from "./style";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";
import PaymentForm from "../../components/PaymentForm";
// import Footer from "../../components/Footer";

export default function Cart() {

  const [gamesList, setGamesList] = useState();
  const [isWaitingServer, setWaitingServer] = useState(true);
  const [type, setType] = useState("");
  const gamesIds = JSON.parse(sessionStorage.getItem("cart"));
  const user = JSON.parse(sessionStorage.getItem("session"))?.user;
  const history = useHistory();
  const paymentOptions = [
    { value: 0, label: "Pix" },
    { value: 1, label: "Crédito" },
    { value: 2, label: "Débito" },
    { value: 3, label: "Boleto" }
  ];

  const removeGame = (id, event) => {
    event.stopPropagation();
    if (window.confirm("Deseja remover o jogo do seu carrinho?")) {
      const cart = JSON.parse(sessionStorage.getItem("cart"));
      cart.splice(cart.indexOf(id), 1);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      const games = [...gamesList];
      const gameRemoved = games.find(game => game.id === id);
      games.splice(games.indexOf(gameRemoved), 1);
      setGamesList(games);
    }
  }

  const checkout = card => {

  }

  useEffect(() => {
    if (gamesIds && gamesIds.length) {
      const promise = axios.post("http://localhost:4000/cart", {
        ids: gamesIds || []
      });
      promise.then(({ data }) => {
        setWaitingServer(false);
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
        <ListHeader>
          <ListTitle>Seu carrinho - {gamesList && gamesList.length === 1 ? "1 item" : `${gamesList && gamesList.length} itens`}</ListTitle>
          <Button onClick={() => history.push("/")}>Continuar comprando</Button>
        </ListHeader>
        {gamesList && gamesList.map(game => (
          <Item key={game.id} onClick={() => history.push(`/game/${game.id}`)}>
            <GameCover src={game.image} alt={game.name} />
            <GameInfo>
              <GameTitle>{game.name}</GameTitle>
              <ItemFooter>
                <GamePrice>{(game.price / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</GamePrice>
                <RemoveButton onClick={e => removeGame(game.id, e)}><FaTrashAlt /></RemoveButton>
              </ItemFooter>
            </GameInfo>
          </Item>
        ))}
      </ListItens>
      <OrderInfo>
        <OrderTitle>Pedido</OrderTitle>
        {user ?
          <UserOn>
            <TotalPrice>Valor total:
              <strong> {
                gamesList &&
                (gamesList.reduce((sum, game) => sum += game.price, 0) / 100)
                  .toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })
              }</strong>
            </TotalPrice>
            <PaymentMethods>
              <Select
                isClearable={true}
                styles={customStyles}
                onChange={e => setType(e?.label)}
                placeholder="Formas de pagamento..."
                className="react-select-container"
                classNamePrefix="react-select"
                options={paymentOptions}
              />
              <PaymentForm type={type} checkout={checkout} />
            </PaymentMethods>
          </UserOn>
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