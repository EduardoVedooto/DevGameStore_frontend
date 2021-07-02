import { CartContainer, ListItens, ListTitle, Item, OrderInfo, TitleEmptyList, CartContainerEmpty, Button, GameCover, GameTitle, GameInfo, RemoveButton, ItemFooter, GamePrice, UserOff, TitleOff, OrderTitle, UserOn, TotalPrice, PaymentMethods, customStyles, ListHeader, GoBackButton } from "./style";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";
import PaymentForm from "../../components/PaymentForm";
import Footer from "../../components/Footer";

export default function Cart() {
  const [gamesList, setGamesList] = useState();
  const [isWaitingServer, setWaitingServer] = useState(true);
  const [type, setType] = useState("");
  const gamesIds = JSON.parse(sessionStorage.getItem("cart"));
  const user = JSON.parse(sessionStorage.getItem("session"))?.user;
  const token = JSON.parse(sessionStorage.getItem("session"))?.token;
  const history = useHistory();
  const totalPrice = gamesList && gamesList.reduce((sum, game) => sum += game.price, 0);
  const paymentOptions = [
    { value: 0, label: "Pix" },
    { value: 1, label: "Credit" },
    { value: 2, label: "Debit" },
    { value: 3, label: "Ticket" }
  ];

  const removeGame = (id, event) => {
    event.stopPropagation();
    if (window.confirm("Do you wish to remove this game from your cart?")) {
      const cart = JSON.parse(sessionStorage.getItem("cart"));
      cart.splice(cart.indexOf(id), 1);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      const games = [...gamesList];
      const gameRemoved = games.find(game => game.id === id);
      games.splice(games.indexOf(gameRemoved), 1);
      setGamesList(games);
    }
  }

  const checkout = (card, type) => {
    const gamesSelected = gamesList.map(game => ({
      price: game.price,
      id: game.id
    }));

    const promise = axios.post("https://dev-game-store.herokuapp.com/checkout", {
      games: gamesSelected,
      total: totalPrice,
      card: card && card
    }, {
      params: { type: type || "bol" },
      headers: { Authorization: `Bearer ${token}` }
    });
    promise.then(() => {
      window.alert("Your order has been received!");
      sessionStorage.removeItem("cart");
      history.push("/");
    });
    promise.catch(e => console.error(e));


  }

  useEffect(() => {
    if (gamesIds && gamesIds.length) {
      const promise = axios.post("https://dev-game-store.herokuapp.com/cart", {
        ids: gamesIds || []
      });
      promise.then(response => {
        if (response.status === 206) {
          const ids = JSON.parse(sessionStorage.getItem("cart"));
          const objIds = {};
          for (let i = 0; i < ids.length; i++) {
            objIds[ids[i]] = ids[i];
          }
          const validIds = response.data.filter(game => objIds[game.id]);
          sessionStorage.setItem("cart", JSON.stringify(validIds.map(game => game.id)));
        }
        setWaitingServer(false);
        setGamesList(response.data);
      });
      promise.catch(err => {
        if (err.response.status === 404) {
          sessionStorage.removeItem("cart");
        }
        setWaitingServer(false);
        console.error(err.response.data);
      });
    }
  }, []); //eslint-disable-line

  if (!gamesIds || !gamesIds.length) {
    return (
      <>
        <CartContainerEmpty>
          <Header />
          <TitleEmptyList>Your cart is empty</TitleEmptyList>
          <Button onClick={() => history.push("/")}>Return to the homepage</Button>
        </CartContainerEmpty>
        <Footer />
      </>
    );
  }

  if (isWaitingServer) {
    return (
      <>
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
        <Footer />
      </>
    );
  }

  return (
    <>
      <CartContainer>
        <Header />
        <ListItens>
          <ListHeader>
            <ListTitle>Your cart - {gamesList && gamesList.length === 1 ? "1 item" : `${gamesList && gamesList.length} items`}</ListTitle>
            <GoBackButton onClick={() => history.push("/")}>Keep buying</GoBackButton>
          </ListHeader>
          {gamesList && gamesList.map(game => (
            <Item key={game.id} onClick={() => history.push(`/game/${game.id}`)}>
              <GameCover src={game.image} alt={game.name} />
              <GameInfo>
                <GameTitle>{game.name}</GameTitle>
                <ItemFooter>
                  <GamePrice>{(game.price / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</GamePrice>
                </ItemFooter>
              </GameInfo>
              <RemoveButton onClick={e => removeGame(game.id, e)}><FaTrashAlt /></RemoveButton>
            </Item>
          ))}
        </ListItens>
        <OrderInfo>
          <OrderTitle>Order</OrderTitle>
          {user ?
            <UserOn>
              <TotalPrice>Total price:
                <strong> {
                  gamesList && (totalPrice / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })
                }</strong>
              </TotalPrice>
              <PaymentMethods>
                <Select
                  isClearable={true}
                  styles={customStyles}
                  onChange={e => setType(e?.label)}
                  placeholder="Payment methods..."
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
                <strong>You are not logged in</strong> 😕<br />
                <Link to="/sign-in">Login</Link>, or
                <Link to="/sign-up"> sign up</Link> to proceed!
              </TitleOff>
            </UserOff>
          }
        </OrderInfo>
      </CartContainer >
      <Footer />
    </>
  );
}