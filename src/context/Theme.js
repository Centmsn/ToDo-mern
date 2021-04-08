import { ThemeProvider } from "styled-components";
import { useContext } from "react";

import SettingsContext from "../context/Settings";

const Theme = ({ children }) => {
  const { darkMode } = useContext(SettingsContext);

  // TODO: add darkmode
  const theme = {
    colors: {
      main: darkMode ? "rgb(121, 137, 140)" : "rgb(143, 193, 204)",
      off: darkMode ? "rgb(66, 88, 122)" : "rgb(255, 219, 120)",
      gray: "rgb(140, 140, 140)",
      blue: "rgb(102, 173, 189)",
      red: {
        100: "rgb(255, 226, 219)",
        200: "rgb(222, 175, 164)",
        300: "rgb(199, 125, 107)",
        400: "rgb(222, 69, 33)",
        500: "rgb(181, 34, 0)",
      },
      background: darkMode ? "rgb(50, 50, 50)" : "rgb(255, 255, 255)",
      text: darkMode ? "rgb(200, 200, 200)" : "rgb(0, 0, 0)",
    },
    fonts: {
      main: "'Blinker', sans-serif",
    },
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
