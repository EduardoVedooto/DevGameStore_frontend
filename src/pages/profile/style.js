import styled from "styled-components";

export const ProfileContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 0 5rem;
  min-height: calc(100vh - 34.77rem);
  width: 100%;
  margin-top: 10rem;

  @media(max-width: 700px){
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
  }
`;

export const LeftPanel = styled.aside`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  @media(max-width: 700px){
    margin-top: 4rem;
    svg{
      width: 19rem;
      height: 19rem;
    }
  }

  svg{
    width: 25rem;
    height: 25rem;
    color: var(--color-darker)
  }
`;

export const ProfilePicture = styled.img`
  width: 22.5rem;
  height: 22.5rem;
  border-radius: 50%;
`;

export const Name = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: var(--color-darker);
  margin-top: 2rem;
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  padding: 0 2rem;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  border-radius: .5rem;
  padding: 2rem 1rem;
  font-size: 1.9rem;
`;

export const Label = styled.label`
  font-size: 1.8rem;
  color: var(--color-lighter);
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: .7rem;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap:3rem;
  width: 100%;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media(max-width: 700px){
    margin-top: 4rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Button = styled.button`
  border: none;
  outline: none;
  padding: 1rem 4rem;
  border-radius: .5rem;
  background-color: var(--color-darker);
  color: var(--color-lighter);
  font-size: 2rem;
  cursor: pointer;

  transition: background 300ms ease-in-out, color 300ms ease-in-out;
  :hover{
    background-color: var(--color-primary);
    color: var(--color-darker);
  }
  @media(max-width: 700px){
    border-radius: 0;
    height: 5rem;
    :hover{
      background-color: var(--color-darker);
      color: var(--color-lighter);
    }
  }
`;

export const SaveButton = styled(Button)`
  display: ${props => props.isDisable ? "none" : "block"};
  @media(max-width: 700px) {
    background-color: var(--color-primary);

  }
`;