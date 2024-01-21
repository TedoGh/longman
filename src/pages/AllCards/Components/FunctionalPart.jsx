import React from 'react'
import { styled } from 'styled-components'
import { useTranslation } from 'react-i18next';
import { CiSearch } from "react-icons/ci";

const MainDiv = styled.div`
  padding-top: 31px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    font-size: 42px;
    font-weight: 700;
    line-height: 48.3px;
    color: #ffffff;
    margin-bottom: 17px;
  }

  & p {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    color: #fff4a3;
    margin-bottom: 30px;
  }
  @media (max-width: 1024px) {
    padding-top: 57px;
    line-height: 27.6px;
    & h1 {
      font-size: 24px;
      font-weight: 700;
      line-height: 27.6px;
    }
    & p {
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 36px;
    }
  }

  & .notFound {
    margin-top: 100px;
  }

  @media (max-width: 767px) {
    padding-top: 83px;

    & h1 {
      font-size: 30px;
      font-weight: 700;
      line-height: 34.6px;
      margin-bottom: 26px;
    }
    & p {
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 37px;
    }
  }

  & .notFound {
    margin-top: 209px;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 498px;
  height: 54px;
  padding: 15px, 23px, 15px, 23px;
  padding-left: 15px;
  border-radius: 30px;
  gap: 8px;
  background-color: #23252e;

  & input {
    padding-top: 5px;
    border: none;
    background-color: #23252e;
    height: 35px;
    width: 90%;
    outline: none;
    color: white;
    font-size: 24px;
    margin-top: 5px;
  }

  &:focus-within {
    border: 2px solid #fff;
  }

  & .searchIcon {
    color: white;
    font-size: 24px;
    margin-top: 13px;
  }

  @media (max-width: 1024px) {
    width: 431px;
    height: 46px;
    border-radius: 26px;

    border-radius: 25.96px;
    gap: 6.92px;
    padding-left: 20px;

    & input {
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
      font-size: 16px;
      padding-bottom: 2px;
    }

    & .searchIcon {
      font-size: 20px;
    }
  }

  @media (max-width: 767px) {
    width: 356px;
    height: 46px;
    border-radius: 21px;

    gap: 6px;
    padding-left: 10px;

    & input {
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
      font-size: 14px;
      padding-bottom: 10px;
    }

    & .searchIcon {
      align-self: flex-start;
      font-size: 14px;
    }
  }
`;

const LanguageButton = styled.button`
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  color: ${(props) => {
    return props.active ? "#04AA6D" : "#FFF4A3";
  }};

  @media (max-width: 1024px) {
    font-size: 20px;
    line-height: 26px;
  }

  @media (max-width: 767px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

const LanguageSwitcher = styled.div`
  display: flex;
  flex-direction: row;
  gap: 150px;
  margin-top: 34px;
  margin-bottom: 70px;

  @media (max-width: 1024px) {
    gap: 100px;
    margin-top: 32px;
    margin-bottom: 30px;
  }

  @media (max-width: 767px) {
    gap: 80px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
`;

const FunctionalPart = ({language, setLanguage,cardsOnCurrentPage,inputValue,searchRef,handleInputChange}) => {
  const {t} = useTranslation();

  return (
    <MainDiv>
    <h1>{t("allCardsText")}</h1>
    <p>{t("allCardsPressCardText")}</p>
    <SearchDiv>
      <CiSearch className="searchIcon" />
      <input
        placeholder={t("searchCard")}
        type="text"
        ref={searchRef}
        onChange={handleInputChange}
      />
    </SearchDiv>
    <LanguageSwitcher>
      <LanguageButton
        active={language == "GEO"}
        onClick={() => setLanguage(t("GEO"))}
      >
        {t("georgianLng")}
      </LanguageButton>
      <LanguageButton
        active={language == "FRGN"}
        onClick={() => setLanguage(t("FRGN"))}
      >
        {t("foreignLng")}
      </LanguageButton>
    </LanguageSwitcher>
    {cardsOnCurrentPage?.length === 0 && inputValue !== "" && (
      <p className="notFound">{t("cardsNotFound")}</p>
    )}
  </MainDiv>
  )
}

export default FunctionalPart