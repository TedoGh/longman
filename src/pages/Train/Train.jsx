import styled from "styled-components";
import { useTranslation } from "react-i18next";
import TrainImg from "../../assets/images/train-page.png";
import GuessCard from "./Components/guessCard";
import React, { useState, useEffect, useRef } from "react";
import { useCardsDataContext } from "../../Context/CardsContext";
import { toast } from "react-hot-toast";
import { useAuthorizationContext } from "../../Context/AuthorizationContext";
import StartTrain from "./Components/StartTrain";

const TrainContainer = styled.div`
  width: 100%;
  height: 618px;
  background: url(${TrainImg});

  display: flex;
  flex-direction: column;

  align-items: center;
  flex-direction: column;
  @media (max-width: 1024px) {
    height: 400px;
  }
  @media (max-width: 767px) {
    height: 480px;
  }
`;



const Train = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(20);
  const [languageState, setLanguageState] = useState("GEO");
  const modalRef = useRef(null);
  const { cards } = useCardsDataContext();
  const { user } = useAuthorizationContext();
  const [examFinished, setExamFinished] = useState(false);

  const handleClick = () => {
    if (user) {
      if (user.cards.length >= selectedNumber) {
        setActive(true);
      } else {
        toast.error(t("notEnaughCards"));
      }
    } else {
      if (cards.length >= selectedNumber) {
        setActive(true);
      } else {
        toast.error(t("notEnaughCards"));
      }
    }
  };

  const changeColor = (number) => {
    setSelectedNumber(number === selectedNumber ? null : number);
  };

  const languageSwitch = () => {
    if (languageState === "GEO") {
      setLanguageState("FRGN");
    }
    if (languageState === "FRGN") {
      setLanguageState("GEO");
    }
  };

  return (
    <TrainContainer>
      {!examFinished && (
        
        <StartTrain  languageState = {languageState} languageSwitch = {languageSwitch}  selectedNumber = {selectedNumber} changeColor = {changeColor} handleClick = {handleClick}  />
        
      )}
      {active && (
        <GuessCard
          active={active}
          setActive={setActive}
          cards={cards}
          selectedNumber={selectedNumber}
          languageState={languageState}
          examFinished={examFinished}
          setExamFinished={setExamFinished}
        />
      )}
    </TrainContainer>
  );
};

export default Train;
