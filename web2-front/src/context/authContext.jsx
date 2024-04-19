import { createContext } from "react";
export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  function clearToken() {
    localStorage.removeItem("token");
  }

  function handleTokenLogin(token) {
    localStorage.setItem("token", token);
  }

  return (
    <AuthContext.Provider
      value={{
        handleTokenLogin,
        clearToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
