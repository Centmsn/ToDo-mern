import { createGlobalStyle } from "styled-components";
import { useContext } from "react";

import SettingsContext from "context/Settings";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ${({ theme }) => theme.fonts.main};
    }

    :root {

    }

    body {
        overflow: hidden;
        font-size: ${({ fontSize }) => fontSize}px;
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

const GlobalStyleProvider = ({ children }) => {
  const { fontSize } = useContext(SettingsContext);
  return <GlobalStyle fontSize={fontSize}>{children}</GlobalStyle>;
};

export default GlobalStyleProvider;
