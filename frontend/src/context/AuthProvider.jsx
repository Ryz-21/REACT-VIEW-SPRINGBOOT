import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    setUser({ username: "Usuario Demo", email: "demo@example.com" });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
