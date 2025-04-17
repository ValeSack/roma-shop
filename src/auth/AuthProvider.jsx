import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  OAUTH_STATE: "oauth_state",
  PKCE: "pkce"
};

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN));
  const [oauthState, setIOauthState] = useState(localStorage.getItem(LOCAL_STORAGE_KEYS.OAUTH_STATE));
  const [pkce, setIPKCE] = useState(localStorage.getItem(LOCAL_STORAGE_KEYS.PKCE));
  const navigate = useNavigate();

  const setPKCE = (code) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PKCE, code);
    setIPKCE(code);
  }

  const setOauthState = (code) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.OAUTH_STATE, code);
    setIOauthState(code);
  }

  const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const clearTokens = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.PKCE);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.OAUTH_STATE);
    setIOauthState(null);
    setAccessToken(null);
    setRefreshToken(null);
    setIPKCE(null);
  };

  const login = async (accessToken, refreshToken) => {
    saveTokens(accessToken, refreshToken);
    navigate("/movies");
  }

  const logout = () => {
    clearTokens();
    navigate("/");
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider 
      value={{ 
          accessToken, 
          isAuthenticated, 
          login, 
          logout, 
          refreshToken, 
          oauthState, 
          pkce,
          setPKCE,
          setOauthState, 
        }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);