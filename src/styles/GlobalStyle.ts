import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }

  body {
    background: #121214;
    font-size: 14px;
    font-family: Roboto, Arial, Helvetica, sans-serif;
    color: #f5f5f5
  }
`;
