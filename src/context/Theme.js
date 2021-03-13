import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    main: "rgb(143, 193, 204)",
    off: "rgb(255, 219, 120)",
    gray: "rgb(140, 140, 140)",
    blue: "rgb(102, 173, 189)",
    red: "rgb(181, 34, 0)",
  },
  fonts: {
    main: "'Blinker', sans-serif",
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
