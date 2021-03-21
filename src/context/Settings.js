import { createContext, useState } from "react";

export const SettingsContext = createContext({ darkMode: false });

export const SettingsContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  return (
    <SettingsContext.Provider
      value={{ darkMode, setDarkMode, fontSize, setFontSize }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
