import { CartContainer } from "./style";
import { BsPersonBoundingBox } from "react-icons/bs";
import Header from "../../components/Header";

export default function Cart() {
  const user = JSON.parse(sessionStorage.getItem("session")).user;
  console.log(user);
  return (
    <CartContainer>
      <Header />
    </CartContainer >
  );
}