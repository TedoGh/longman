import { useState } from 'react';

const useLocalStorageCards = (key, initialValue) => {
  
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  
  const [cards, setCards] = useState(initial);

  
  const updateCards = (newArray) => {
    setCards(newArray);
    localStorage.setItem(key, JSON.stringify(newArray));
  };

  
  const addCard = (card) => {
    if(cards.length < 1 ) {
    const newArray = [card];
    updateCards(newArray);
    return
    } else {
    const newArray = [...cards, card];
    updateCards(newArray);
    return
    }
  };

  const deleteCard = (card) => {
    const newArray = cards.filter((item, i) => item.id !== card.id);
    updateCards(newArray);
  };

  
  const editCard = (card,newItem) => {
    const newArray = cards.map((item, i) => (item.id === card.id ? newItem : item));
    updateCards(newArray);
  };

  return {cards, addCard, deleteCard,editCard, updateCards};
};

export default useLocalStorageCards;
