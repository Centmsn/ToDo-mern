import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleStatusChange = isLogged => {
    if (typeof isLogged === "boolean") {
      setIsLoggedIn(isLogged);
    } else {
      console.error(`Expected boolean, instead got ${typeof isLogged}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, setIsLoggedIn: handleStatusChange }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
