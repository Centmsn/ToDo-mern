import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    main: "rgb(255, 255, 222)",
    off: "rgb(255, 219, 120)",
    gray: "rgb(140, 140, 140)",
  },
  fonts: {
    main: "'Blinker', sans-serif",
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
