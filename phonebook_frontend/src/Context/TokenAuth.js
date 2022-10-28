import { useState, useContext, createContext } from "react";
export const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  return <UserAuthContext.Provider value={{ token, setToken }}>{children}</UserAuthContext.Provider>;
};
