import styled from "styled-components";
import { useTranslation } from "react-i18next";
import SwitchTrainImage from "../assets/images/switchTrain.svg";
import Header from "../components/Header";
import GuessCard from "./../components/guessCard";
import React, { useState, useEffect, useRef } from "react";
import { useCardsDataContext } from "./Context/CardsContext";
import { toast } from "react-hot-toast";

const TrainContainer = styled.div`
  width: 100%;
  height: 618px;
  background: url("https://img.ge/images/62318667777440020532.png");
  position: fixed;
  top: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media(max-width: 1024px) {
    height: 400px;
    top: 90px;
  }
  @media(max-width: 767px) {
    height: 480px;
   
  }

`;

const TrainText = styled.p`
  color: white;
  font-size: 42px;
  position: fixed;
  top: 199px;
  font-family: Helvetica;
  font-size: 42px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: left;
  @media(max-width: 1024px) {
    font-size: 24px;
    line-height: 28px;
    top: 151px;

  }
  @media(max-width: 767px) {
    font-size: 30px;
    line-height: 34px;
    top: 180px;
  }
`;

const ClickText = styled.p`
  color: #fff4a3;

  position: fixed;
  top: 276px;
  font-family: Helvetica;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  @media(max-width: 1024px) {
    font-size: 14px;
    line-height: 16px;
    top: 200px;
  }
  @media(max-width: 767px) {
    font-size: 18px;
    line-height: 20px;
    top: 240px;
  }
`;

const LanguageSwitchContainer = styled.div`
  display: flex;
  gap: 128px;
  position: fixed;
  top: 370px;
  @media(max-width: 1024px) {
    top: 260px;
    gap: 100px;
  }
  @media(max-width: 767px) {
    top: 315px;
    gap: 140px;
  }
`;

const LanguageText = styled.p`
  color: ${(props) => (props.isActive ? "#04AA6D" : "#FFF4A3")};
  font-family: Helvetica;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  @media(max-width: 1024px) {
    font-size: 14px;
    line-height: 16px;
  }
  @media(max-width: 767px) {
    font-size: 18px;
    line-height: 20px;
  }
`;

const StartTrainButton = styled.button`
  color: white;
  background: #04aa6d;
  padding: 2.5;
  border-radius: 30px;
  width: 294px;
  height: 47px;
  position: fixed;
  top: 510px;
  font-family: Helvetica;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  @media(max-width: 1024px) {
    border-radius: 30px;
    width: 170px;
    height: 27px;
    font-size: 11px;
    font-weight: 400;
    top: 390px;
  }
  @media(max-width: 767px) {
    border-radius: 30px;
    width: 202px;
    height: 38px;
    font-size: 16px;
    font-weight: 400;
    top: 440px;
    padding-bottom: 4px;
  }
`;

const SwitchTrainButton = styled.button`
  background: url(${SwitchTrainImage});
  width: 23px;
  height: 24px;
  position: fixed;
  top: 380px;
  @media(max-width: 1024px) {
  width: 23px;
  height: 24px;
  top: 260px;
  }
  @media(max-width: 767px) {
    width: 23px;
    height: 24px;
    top: 315px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  gap: 120px;
  grid-template-columns: repeat(3, 1fr);
  position: fixed;
  top: 440px;
  @media(max-width: 1024px) {
    gap: 60px;
    top: 330px;
  }
  @media(max-width: 767px) {
    gap: 130px;
    top: 380px;
  }
`;

const NumberButton = styled.button`
  color: #8c8c8c;
  font-weight: bold;
  font-size: 27px;
  ${(props) => props.isSelected && "color: #04AA6D;"}
  @media(max-width: 1024px) {
    font-size: 18px;
    line-height: 16px;
  }
  @media(max-width: 767px) {
    font-size: 18px;
    line-height: 20px;
  }
`;

const Train = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(20);
  const [languageState, setLanguageState] = useState("GEO");
  const modalRef = useRef(null);
  const { cards } = useCardsDataContext();

  const handleClick = () => {
    if (cards.length >= selectedNumber) {
      setActive(true);
    } else {
      toast.error(t("notEnaughCards"));
    }
  };

  const changeColor = (number) => {
    setSelectedNumber(number === selectedNumber ? null : number);
  };

  const languageSwitch = () => {
    if (languageState === "GEO") {
      setLanguageState("ENG");
    }
    if (languageState === "ENG") {
      setLanguageState("GEO");
    }
  };

  return (
    <TrainContainer>
      <TrainText>{t("trainPageTrainText")}</TrainText>
      <ClickText>{t("trainPageClickText")}</ClickText>
      <LanguageSwitchContainer>
        <LanguageText isActive={languageState === "GEO"}>
          {t("trainPageGeoLangText")}
        </LanguageText>
        <LanguageText isActive={languageState === "ENG"}>
          {t("trainPageEngLangText")}
        </LanguageText>
      </LanguageSwitchContainer>
      <StartTrainButton onClick={handleClick}>
        {t("trainPageStartTrainBNText")}
      </StartTrainButton>
      <SwitchTrainButton onClick={languageSwitch} />
      <GridContainer>
        <NumberButton
          isSelected={selectedNumber === 10}
          onClick={() => changeColor(10)}
        >
          10
        </NumberButton>
        <NumberButton
          isSelected={selectedNumber === 20}
          onClick={() => changeColor(20)}
        >
          20
        </NumberButton>
        <NumberButton
          isSelected={selectedNumber === 30}
          onClick={() => changeColor(30)}
        >
          30
        </NumberButton>
      </GridContainer>

      {active && (
        <GuessCard
          active={active}
          setActive={setActive}
          cards={cards}
          selectedNumber={selectedNumber}
          languageState={languageState}
        />
      )}
    </TrainContainer>
  );
};

export default Train;
