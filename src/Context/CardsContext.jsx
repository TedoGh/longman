// CardsDataContext.js

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import useLocalStorageCards from '../hooks/useLocalStorage';

// Create context
const CardsDataContext = createContext();

// Custom hook to use the context
export const useCardsDataContext = () => {
  const context = useContext(CardsDataContext);
  if (!context) {
    throw new Error('useCardsDataContext must be used within a CardsDataProvider');
  }
  return context;
};

// Provider component to wrap your app and provide the context
export const CardsDataProvider = ({ children }) => {
  // Initialize cards state with values from local storage
  const { cards: initialCards, updateCards, addCard, editCard} = useLocalStorageCards('languageCards', []);
  const [cards, setCards] = useState(initialCards);

  // Function to update cards and trigger a re-render
  const updateCardsContext = useCallback(
    (newCards) => {
      // Update local storage
      updateCards(newCards);
      // Update context
      setCards(newCards);
    },
    [updateCards]
  );

  const addCardsContext = useCallback(
    (newCard) => {
      // Update local storage
      addCard(newCard);
      // Update context
      setCards((prevCards) => [...prevCards, newCard]);
    },
    [addCard]
  );

  const editCardContext = useCallback(
    (card,newItem) => {
      const newArray = cards.map((item, i) => (item.id === card.id ? newItem : item));
      // Update local storage
      editCard(card,newItem);
      // Update context
      setCards(newArray);
    },
    [updateCards]
  );


  // Effect to update context when local storage changes
  useEffect(() => {
    setCards(initialCards);
    console.log('effect')
  }, [initialCards]);

  // Provide the context value to the entire app
  const contextValue = {
    cards,
    updateCardsContext,
    addCardsContext,
    editCardContext
  };

  return <CardsDataContext.Provider value={contextValue}>{children}</CardsDataContext.Provider>;
};
