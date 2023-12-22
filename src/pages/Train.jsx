import { useTranslation } from "react-i18next";
import SwitchTrainLanguage from "../assets/images/switchTrain.svg";
import Header from "../components/Header";
import GuessCard from './../components/guessCard.jsx'
import React, { useState, useEffect, useRef } from "react";

export default function Train() {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(20);
  const [languageState, setLanguageState] = useState(true)

  const modalRef = useRef(null)

  const handleClick = () => {
    setActive(true)
  };

  const changeColor = (number) => {
    setSelectedNumber(number === selectedNumber ? null : number);
  };

  const languageSwitch = () => {
    setLanguageState(!languageState)
  }

  return (
    <div>
      <div className="w-full h-[618px] bg-[url('src/assets/images/trainBackground.svg')] fixed top-[96px] flex justify-center items-center flex-col">
        <p className="text-[white] text-[42px] fixed top-[199px]">
          {t("trainPageTrainText")}
        </p>
        <p className="text-lightYellow text-2xl fixed top-[276px]">
          {t("trainPageClickText")}
        </p>
        <div className="flex gap-[128px] top-[370px] fixed">
          <p className={`text-footerText text-2xl ${
            languageState ? "text-[#FFF4A3]" : "text-footerText"
          }`}>
            {t("trainPageGeoLangText")}
          </p>
          <p className={`text-footerText text-2xl ${
            !languageState ? "text-[#04AA6D]" : "text-footerText"
          }`}>
            {t("trainPageEngLangText")}
          </p>
        </div>
        <button onClick={() => handleClick()} className="text-[white] bg-green p-2.5 rounded-[30px] w-[294px] h-[47px] fixed top-[510px]">
          {t("trainPageStartTrainBNText")}
        </button>
        <button className="bg-[url('src/assets/images/switchTrain.svg')] w-[23px] h-[24px] fixed top-[380px]" onClick={() => {languageSwitch()}}>
        </button>
        <div className="grid gap-x-32 grid-cols-3 top-[440px] fixed">
          <div>         
            <button
              className={`text-footerText font-extrabold text-[27px] ${
                selectedNumber === 10 ? 'text-[#04AA6D]' : ''
              }`}
              onClick={() => changeColor(10)}
            >
            10
            </button>
          </div>
          <div> 
            <button
              className={`text-footerText font-extrabold text-[27px] ${
                selectedNumber === 20 ? 'text-[#04AA6D]' : ''
              }`}
              onClick={() => changeColor(20)}
            >
            20
            </button>
          </div>
          <div>
            <button
              className={`text-footerText font-extrabold text-[27px] ${
                selectedNumber === 30 ? 'text-[#04AA6D]' : ''
              }`}
              onClick={() => changeColor(30)}
            >
            30
            </button>
          </div>
          </div>

          {active && (
              <GuessCard 
                  active={active}
                  setActive={setActive} 
              />
          )}
        
      </div>
    </div>
  );
}
