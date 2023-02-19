import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import AuthService from "@/services/AuthService";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: undefined,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    isAuthenticated: Cookies.get("isAuthenticated") === "true",
    user: Cookies.get("user"),
  });
  const _authService = new AuthService();

  useEffect(() => {
    setAuthData({
      isAuthenticated: Cookies.get("isAuthenticated") === "true",
      user: Cookies.get("user"),
    });
  }, []);

  const login = async (username, password) => {
    const user = await _authService.loginUser(username, password);
    Cookies.set("isAuthenticated", "true");
    Cookies.set("user", JSON.stringify(user));
    setAuthData({ isAuthenticated: true, user: user });
  };

  const logout = async () => {
    Cookies.remove("isAuthenticated");
    Cookies.remove("user");
    setAuthData({ isAuthenticated: false, user: undefined });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authData.isAuthenticated,
        user: authData.user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
