import { CartContainer, ListItens, ListTitle, Item, OrderInfo, TitleEmptyList, CartContainerEmpty, Button } from "./style";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Cart() {

  const [gamesList, SetGamesList] = useState();
  const gamesIds = JSON.parse(sessionStorage.getItem("cart"));
  const user = JSON.parse(sessionStorage.getItem("session"))?.user;
  const history = useHistory();


  // useEffect(() => {
  // }, []); //eslint-disable-line
  if (!gamesIds || !gamesIds.length) {
    return (
      <CartContainerEmpty>
        <Header />

        <TitleEmptyList>Seu carrinho está vazio</TitleEmptyList>
        <Button onClick={() => history.push("/")}>Voltar para home</Button>
      </CartContainerEmpty>
    );
  }



  console.log(gamesList);

  return (
    <CartContainer>
      <Header />
      <ListItens>
        <ListTitle>Seu carrinho</ListTitle>
        {
          gamesList ?
            gamesList.map(game => (
              <Item>

              </Item>
            ))
            :
            <h3>Seu carrinho está vazio</h3>
        }
      </ListItens>
      <OrderInfo></OrderInfo>
    </CartContainer >
  );
}