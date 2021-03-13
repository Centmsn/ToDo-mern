import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={(isLoggedIn, setIsLoggedIn)}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;