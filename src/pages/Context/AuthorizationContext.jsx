import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import useLocalStorageCards from '../../hooks/useLocalStorage';

const AuthorizationContext = createContext();

// Custom hook to use the context
export const useAuthorizationContext = () => {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error('useCardsDataContext must be used within a CardsDataProvider');
  }
  return context;
};

// Provider component to wrap your app and provide the context
export const AuthorizationProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState();  
  const [user,setUser] = useState();
  const [response, setResponse] = useState();
  const [trigger, setTrigger] = useState(false);
  const API_KEY = 'WsdKue2LFxsqmdimIkCyvBgbFLHbcQkk8DjiHohkRccDPRcNdg';

  // Function to update cards and trigger a re-render
  useEffect(() => {
    fetch("https://crudapi.co.uk/api/v1/Authorization", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to get response");
        }
        return res.json();
      })
      .then((data) => {
        setResponse(data);
      })

      .catch((err) => {
        console.error(err);
      });
  }, [trigger]);

  
  const contextValue = {
   loggedIn, setLoggedIn,response,setUser,setTrigger, user
  };

  return <AuthorizationContext.Provider value={contextValue}>{children}</AuthorizationContext.Provider>;
};