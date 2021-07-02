import { createGlobalStyle } from "styled-components";

export const ModalGlobal = createGlobalStyle`
  .searchContainer {
    width: 90%;
    height: fit-content;
    margin: 10rem auto auto auto;

  };
  .ov_searchContainer {
    background-color: rgba(0,0,0,.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200000;
    backdrop-filter: blur(10px);
    display: flex;
  }

`;