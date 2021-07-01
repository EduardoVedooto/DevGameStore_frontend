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