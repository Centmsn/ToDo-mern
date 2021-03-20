import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ${({ theme }) => theme.fonts.main};
    }

    body {
        overflow: hidden;
    }

    a {
        text-decoration: none;
    }

    button {
        border: none;
        outline: none;
        background: none;

        cursor: pointer;
    }

    button:focus {
        outline: none;
    }
`;

export default GlobalStyle;
