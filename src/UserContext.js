import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem("isLoggedIn");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [role, setRole] = useState(localStorage.getItem("role"));
   
  const [userToken, setUserToken] = useState(localStorage.getItem("user-token"));

  const [refresh_token, setRefresh_token] = useState(() => {
    const storedValue = localStorage.getItem("refresh_token");
    return storedValue;
  });
  const [user_id, setUser_id] = useState(() => {
    const storedValue = localStorage.getItem("user_id");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const checkUserToken = () => {

    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", false);
      navigate('/');
    } else {
      const decodedToken = jwt_decode(userToken);
      const tokenExpiration = new Date(decodedToken.exp * 1000);
      if (tokenExpiration < new Date()) {
        refreshTokens();
      } else {
        setIsLoggedIn(true);
        setUser_id(decodedToken.user_id);
        // setRole(decodedToken.)
        console.log(decodedToken)
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user_id", decodedToken.user_id);
        const newExpirationTimestamp = decodedToken.exp * 1000;
        const newTimeUntilExpiration = newExpirationTimestamp - Date.now();
        setTimeout(refreshTokens, newTimeUntilExpiration - 60000);
      }
    }
  };
  let isRefreshing = false;
  const refreshTokens = async () => {
    if (isRefreshing) {
      return;
    }
    isRefreshing = true;
    let refreshInterval;
    try {

      const response = await axios.post('/token/refresh', { "refresh": refresh_token });
      if (response.data.access) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        const newToken = response.data.access;
        const newTokenData = jwt_decode(newToken);
        localStorage.setItem('user-token', newToken);
        setUserToken(newToken);
        localStorage.setItem("refresh_token", response.data.refresh);
        setRefresh_token(response.data.refresh);
        localStorage.setItem("user_id", newTokenData.user_id);
        setUser_id(newTokenData.user_id);
        const newExpirationTimestamp = newTokenData.exp * 1000;
        const newTimeUntilExpiration = newExpirationTimestamp - Date.now();
        if (isLoggedIn) {
          refreshInterval = setInterval(() => refreshTokens(), newTimeUntilExpiration - 60000);
          clearInterval(refreshInterval);
        };
      }
      else if (response.data.code === "token_not_valid") {
        localStorage.setItem("isLoggedIn", false);
        clearInterval(refreshInterval);
        setIsLoggedIn(false);
        localStorage.removeItem('user-token');
        setUserToken(null);
        localStorage.removeItem('refresh_token');
        setRefresh_token(null)
        navigate('/');
      }
    } catch (error) {
      clearInterval(refreshInterval);
      localStorage.setItem("isLoggedIn", false);
      setIsLoggedIn(false);
      localStorage.removeItem('user-token');
      setUserToken(null);
      localStorage.removeItem('refresh_token');
      setRefresh_token(null)
      navigate('/');
    }
    finally {
      isRefreshing = false;
    }
  };

  useEffect(() => {
    checkUserToken();
  },
    [refresh_token]);


  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userToken, setUserToken, refresh_token, setRefresh_token, user_id, role,setRole }}>
      {children}
    </UserContext.Provider>
  );
};