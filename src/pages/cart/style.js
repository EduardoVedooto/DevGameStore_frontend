import styled from "styled-components";

export const CartContainer = styled.main`
  background-color: var(--color-dark);
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  min-height: calc(100vh - 10rem);
  margin-top: 12rem;
  padding: 0 5rem;
`;

export const ListTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-lighter);
`;

export const ListItens = styled.ul`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const Item = styled.li`
  display: flex;
  width: 100%;
  height: 10rem;
  padding: .5rem;
  padding-right: 1.5rem;
  background-color: var(--color-darker);
  color: var(--color-lighter);
  border-radius: 1rem;
  cursor: pointer;
  
  &:hover{
    h3 {
      color: var(--color-primary);
    }
  }
`;

export const OrderInfo = styled.aside`
  background-color: var(--color-darker);
  border-radius: 1rem;
  width: 100%;
  color: var(--color-lighter);
  padding: 1rem;
  height: fit-content;
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

export const GameInfo = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 1rem;
  width: 100%;
`;

export const GameCover = styled.img`
  height: 9rem;
  width: 16rem;
  object-fit: cover;
  border-radius: .5rem;
`;

export const GameTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  transition: color 150ms;
`;

export const ItemFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RemoveButton = styled(Button)`
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background-color: var(--color-darker);
  transition: background 200ms;

  svg {
    width: 70%;
    height: 70%;
    margin: auto;
    color: var(--color-primary);
    transition: color 200ms;
  }

  &:hover{
    filter: brightness(1);
    background-color: var(--color-primary);
    svg{
      color: var(--color-darker);
    }
  }
`;

export const GamePrice = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
`;

export const OrderTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

export const UserOff = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 2.5rem 0;
`;

export const TitleOff = styled.h3`
  font-size: 1.8rem;
  text-align: center;
  line-height: 3rem;
  strong{
    color: var(--color-primary);
  }

  a {
    color: var(--color-primary);
    :hover{
      font-weight: 700;
      text-decoration: underline;
    }
  }
`;