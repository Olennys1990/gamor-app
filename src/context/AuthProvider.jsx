import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "123456";
const TOKEN_KEY = "gamor_token";
const USER_KEY = "gamor_user";
const EXPIRATION_HOURS = 1;

const generateFakeToken = (username) => {
  const payload = { username, issuedAt: Date.now() };
  return btoa(JSON.stringify(payload));
};

const verifyFakeToken = async (token) => {
  // Simulating API call time (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));
  try {
    const payload = JSON.parse(atob(token));
    const maxAge = EXPIRATION_HOURS * 60 * 60 * 1000;
    const isExpired = Date.now() - payload.issuedAt > maxAge;
    if (isExpired) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return null;
    }
    return payload.username;
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        const username = await verifyFakeToken(storedToken);
        if (username) {
          setIsLoggedIn(true);
          setUser(username);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback((username, password) => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const token = generateFakeToken(username);
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, username);
      setIsLoggedIn(true);
      setUser(username);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setIsLoggedIn(false);
    setUser("");
  }, []);

  const value = {
    isLoggedIn,
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
