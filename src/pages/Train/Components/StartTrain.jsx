import React from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components';
import SwitchTrainImage from "../../../../src/assets/images/switchTrain.svg";

const TrainText = styled.p`
  color: white;
  font-size: 42px;
  margin-top: 105px;
  font-size: 42px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: left;
  @media (max-width: 1024px) {
    font-size: 24px;
    line-height: 28px;
    margin-top: 52px;
  }
  @media (max-width: 767px) {
    font-size: 30px;
    line-height: 34px;
    margin-top: 92px;
  }
`;

const ClickText = styled.p`
  color: #fff4a3;
  margin-top: 29px;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  @media (max-width: 1024px) {
    font-size: 14px;
    line-height: 16px;
    margin-top: 17.6px;
  }
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: 20px;
    margin-top: 29px;
    text-align: center;
  }
`;

const LanguageSwitchContainer = styled.div`
  display: flex;
  gap: 42px;
  margin-top: 66px;
  margin-bottom: 42px;

  @media (max-width: 1024px) {
    margin-top: 43px;
    margin-bottom: 41px;
    gap: 44px;
  }
  @media (max-width: 767px) {
    margin-top: 38px;
    margin-bottom: 46px;
    gap: 67px;
  }
`;

const LanguageText = styled.p`
  color: ${(props) => (props.isActive ? "#04AA6D" : "#FFF4A3")};
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  @media (max-width: 1024px) {
    font-size: 14px;
    line-height: 16px;
  }
  @media (max-width: 767px) {
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
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  @media (max-width: 1024px) {
    border-radius: 30px;
    width: 170px;
    height: 27px;
    font-size: 11px;
    font-weight: 400;
  }
  @media (max-width: 767px) {
    border-radius: 30px;
    width: 202px;
    height: 38px;
    font-size: 16px;
    font-weight: 400;

    padding-bottom: 4px;
  }
`;

const SwitchTrainButton = styled.button`
  /* background: url(${SwitchTrainImage}); */
  width: 23px;
  height: 24px;
  margin-top: 5px;

  @media (max-width: 1024px) {
    width: 23px;
    height: 24px;
    margin-top: 0;
  }
  @media (max-width: 767px) {
    width: 23px;
    height: 24px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  gap: 120px;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 42px;

  @media (max-width: 1024px) {
    gap: 87px;
  }
  @media (max-width: 767px) {
    gap: 108px;
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
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: 20px;
  }
`;



const StartTrain = ({languageState, languageSwitch, selectedNumber, changeColor, handleClick}) => {
  const {t} = useTranslation();
  return (
    <>
    <TrainText>{t("trainPageTrainText")}</TrainText>
    <ClickText>{t("trainPageClickText")}</ClickText>
    <LanguageSwitchContainer>
      <LanguageText isActive={languageState === "GEO"}>
        {t("georgianLng")}
      </LanguageText>
      <SwitchTrainButton onClick={languageSwitch}>
        <img src={SwitchTrainImage} alt="" />
      </SwitchTrainButton>
      <LanguageText isActive={languageState === "FRGN"}>
        {t("foreignLng")}
      </LanguageText>
    </LanguageSwitchContainer>

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
    <StartTrainButton onClick={handleClick}>
      {t("trainPageStartTrainBNText")}
    </StartTrainButton>
    </>
  )
}

export default StartTrain