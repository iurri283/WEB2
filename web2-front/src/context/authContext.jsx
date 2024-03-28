import { createContext, useState } from "react";
export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [ID, setID] = useState("");

  function clearToken() {
    setToken("");
    setID("");
  }

  function handleTokenLogin(token, ID) {
    setToken(token);
    setID(ID);
  }

  const isLogado = !!token;

  return (
    <AuthContext.Provider
      value={{
        isLogado,
        token,
        ID,
        handleTokenLogin,
        clearToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
