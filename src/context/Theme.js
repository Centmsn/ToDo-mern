import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    main: "rgb(255, 255, 222)",
    off: "rgb(255, 219, 120)",
  },
  fonts: {
    main: "Comfortaa",
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
