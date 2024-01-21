import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import useLocalStorageCards from "../hooks/useLocalStorage";

const CardsDataContext = createContext();

// იმ შემთხვევაში თუ იუზერი არ არის შესული, ხდება local storage-ში ბარათების დამტება,რედაქტირება/შენახვა, ამისთვის
// შექმნილია cards- კონტექსტიც, რათა ყველა კომპონენტმა დაინახოს, ასევე კონტექტი local storage-ში მიმდნარე ცვლილებებსაც მომენტალურად აღიქვამს

export const useCardsDataContext = () => {
  const context = useContext(CardsDataContext);
  if (!context) {
    throw new Error(
      "useCardsDataContext must be used within a CardsDataProvider"
    );
  }
  return context;
};

export const CardsDataProvider = ({ children }) => {
  const {
    cards: initialCards,
    updateCards,
    addCard,
    editCard,
  } = useLocalStorageCards("languageCards", []);
  const [cards, setCards] = useState(initialCards);

  const updateCardsContext = useCallback(
    (newCards) => {
      updateCards(newCards);

      setCards(newCards);
    },
    [updateCards]
  );

  const addCardsContext = useCallback(
    (newCard) => {
      addCard(newCard);

      setCards((prevCards) => [...prevCards, newCard]);
    },
    [addCard]
  );

  const editCardContext = useCallback(
    (card, newItem) => {
      const newArray = cards.map((item, i) =>
        item.id === card.id ? newItem : item
      );

      editCard(card, newItem);

      setCards(newArray);
    },
    [updateCards]
  );

  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  const contextValue = {
    cards,
    updateCardsContext,
    addCardsContext,
    editCardContext,
  };

  return (
    <CardsDataContext.Provider value={contextValue}>
      {children}
    </CardsDataContext.Provider>
  );
};
