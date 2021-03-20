import { createContext, useState } from "react";

export const SettingsContext = createContext({ darkMode: false });

export const SettingsContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <SettingsContext.Provider
      value={{ darkMode: isDarkMode, setDarkMode: setIsDarkMode }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
