import { createContext, useState, useEffect } from "react";

import { handleLocalStorage } from "utils/handleLocalStorage";

export const SettingsContext = createContext({ darkMode: false });

export const SettingsContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const handleFontSize = size => {
    handleLocalStorage("fontSize", size);
    setFontSize(size);
  };

  const handleDarkMode = isDarkmode => {
    handleLocalStorage("darkmode", isDarkmode);
    setDarkMode(isDarkmode);
  };

  useEffect(() => {
    const darkmode = handleLocalStorage("darkmode");
    const fontSize = handleLocalStorage("fontSize");

    if (darkmode) setDarkMode(Boolean(darkmode));
    if (fontSize) setFontSize(fontSize * 1);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        setDarkMode: handleDarkMode,
        fontSize,
        setFontSize: handleFontSize,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
