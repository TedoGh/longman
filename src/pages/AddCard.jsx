import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import moreVertLight from "../assets/images/moreVertLight.svg";
import moreVertDark from "../assets/images/moreVertDark.svg";
import trash from "../assets/images/trash.svg";
import Header from "../components/Header";
import AddCardForm from "../components/AddCardForm";


const API = "https://dzenebieri-flashcards-api.onrender.com/cards";

export default function AddCard() {
  const { t } = useTranslation();
  const [flippedCards, setFlippedCards] = useState([]);
  const [showBNs, setShowBNs] = useState(false);
  
   

  return (
    <div>
      <AddCardForm modal={false} />
    </div>
  );
}


  /* <ul>
{cards.map((card) => (
  <div key={card.id}>
    <li
      key={card.id}
      onClick={() => handleCardClick(card.id)}
      className="w-[267px] h-[79px] cursor-pointer"
    >
      <div className="font-bold">
        {flippedCards.includes(card.id) ? (
          <div className="text-darkBlue bg-lightYellow w-[267px] h-[79px] flex justify-center items-center rounded-md">
            <span>{card.georgian}</span>
            <button
              onClick={() => {
                setShowBNs(!showBNs, card.id);
              }}
            >
              <img src={moreVertDark} alt="Buttons Menu" />
            </button>
            {showBNs && (
              <button onClick={() => handleDelete(card.id)}>
                <img src={trash} alt="Trash" />
              </button>
            )}
          </div>
        ) : (
          <div className="text-[white] bg-green w-[267px] h-[79px] flex justify-center items-center rounded-md">
            <span>{card.english}</span>
            <button
              onClick={() => {
                setShowBNs(!showBNs, card.id);
              }}
            >
              <img src={moreVertLight} alt="Buttons Menu" />
            </button>
            {showBNs && (
              <button onClick={() => handleDelete(card.id)}>
                <img src={trash} alt="Trash" />
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  </div>
))}
</ul> */

