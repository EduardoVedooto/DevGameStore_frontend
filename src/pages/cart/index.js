import { CartContainer, ListItens, ListTitle, Item, OrderInfo } from "./style";
import Header from "../../components/Header";
import { useState } from "react";

export default function Cart() {

  const [gamesList, SetGamesList] = useState([]);


  const user = JSON.parse(sessionStorage.getItem("session"))?.user;

  return (
    <CartContainer>
      <Header />
      <ListItens>
        <ListTitle>Seu carrinho</ListTitle>
        {
          gamesList.length ?
            gamesList.map(game => (
              <Item>

              </Item>
            ))
            :
            <h3>Seu carrinho está vazio</h3>
        }
        <Item>
          <img src="#"></img>
        </Item>
      </ListItens>
      <OrderInfo></OrderInfo>
    </CartContainer >
  );
}