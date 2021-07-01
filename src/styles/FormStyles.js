import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: clamp(19.32rem, 70%, 650rem);
  padding: 3rem 2rem 2rem 2rem;
  border: .2rem solid var(--color-darker);
  border-radius: .7rem;
  position: relative;
  max-width: 50rem;
  @media(max-width: 614px) {
    min-width: 100%;
    border: none;
    height: 100vh;
    padding: 10rem 0 0 0;
  }
`;

export const FormTitle = styled.h1`
  position: absolute;
  top: -1.5rem;
  left: 2.35rem;
  padding: .5rem 1rem;
  font-size: 1.8rem;
  font-weight: 700;
  background-color: var(--color-primary);
  border-radius: .5rem;
  user-select: none;
  color: var(--color-darker);
  @media(max-width: 614px) {
    text-align: center;
    width: 100%;
    height: 6rem;
    position: static;
    margin-bottom: auto;
    line-height: 5rem;
    border-radius: 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 4.5rem;
  border-radius: .5rem;
  padding-left: .8rem;
  outline: none;
  border: none;
  font-size: 1.8rem;
  &:focus{
    box-shadow: 0 0 .5rem rgba(0,0,0,.5);
  }
  @media(max-width: 614px) {
    width: 90%;
  }
`;

export const Button = styled.button`
  border: none;
  outline: none;
  background-color: ${props => props.disabled ? "var(--color-primary)" : "var(--color-darker)"};
  color: var(--color-light);
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  padding: 1rem 3rem;
  border-radius: .5rem;
  margin-top: 2rem;
  height: 5rem;
  font-size: 2rem;
  font-weight: 700;
  transition: .4s all;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${props => props.disabled ? "none" : "default"};
  &:hover{
    box-shadow: ${props => props.disabled ? "none" : "0 0 .5rem rgba(0,0,0,.5)"};
    background-color: var(--color-primary);
    color: var(--color-darker);
    padding: 2rem 4rem;
  }
  @media(max-width: 614px) {
    margin-top: auto;
    width: 100%;
    height: 6.5rem;
    border-radius: 0;
    background-color: var(--color-primary);
    color: var(--color-darker)
  }
`;