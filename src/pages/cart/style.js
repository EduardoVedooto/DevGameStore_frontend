import styled from "styled-components";

export const CartContainer = styled.main`
  background-color: var(--color-dark);
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  min-height: calc(100vh - 10rem);
  margin-top: 10rem;
  padding: 0 5rem;
`;

export const ListTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-lighter);
`;

export const ListItens = styled.ul`
  background-color: purple;
  width: 100%;
  height: 10rem;
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: rosybrown;
`;

export const OrderInfo = styled.aside`
  background-color: red;
  width: 100%;
  height: 10rem;
`;

export const TitleEmptyList = styled.h2`
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-lighter);
  user-select: none;
`;

export const CartContainerEmpty = styled(CartContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  line-height: 3rem;
`;

export const Button = styled.button`
  background-color: var(--color-primary);
  padding: 1rem 3rem;
  border-radius: .5rem;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 2.0rem;
  font-weight: 700;
  transition: all 300ms ease-in-out;
  &:hover{
    filter: brightness(1.3);
    box-shadow: 0 0 1rem rgba(0,0,0,.5);
    color: var(--color-darker)
  }
`;