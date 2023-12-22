import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import CardComponent from "../components/CardComponent";
import AllCardsPagination from "../components/AllCardsPagination";
import { styled } from "styled-components";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useCardsDataContext } from "./Context/CardsContext";

const MainDiv = styled.div`
  height: 1077px;
  background-color: #282a35;
  position: relative;
`;

const SecondaryDiv = styled.div`
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
    font-family: Helvetica;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    color: #fff4a3;
    margin-bottom: 30px;
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
`;

const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 200px;
  margin-top: 60px;
  margin-left: 100px;
  margin-right: 100px;
`;

const CardColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const EmptyDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 400px;
  left: 455px;
  & div {
    width: 250px;
    height: 250px;
    border-radius: 126px;
    background-color: #393c49;
  }

  & p {
    margin-top: 50px;
    font-family: Helvetica;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;

    color: #b6b6b9;
  }
`;
export default function AllCards() {
  const { cards, updateCardsContext } = useCardsDataContext();
  const { t } = useTranslation();
  const dividedCardsArr = [];
  const searchRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const columns =
    inputValue === ""
      ? Math.ceil(cards.length / 5)
      : Math.ceil(
          cards.filter(
            (card) =>
              card.georgian.startsWith(inputValue) ||
              card.english.startsWith(inputValue)
          ).length / 5
        );
  const [searchParams, setSearchParams] = useSearchParams();
  const [cardsOnCurrentPage, setCardsOnCurrentPage] = useState([]);
  const [language, setLanguage] = useState("ENG");
  const pages = Math.ceil(columns / 3);
  let currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const handleLanguageChange = () => {
    if (language === "ENG") {
      setLanguage(t("GEO"));
    }
    if (language === "GEO") {
      setLanguage(t("ENG"));
    }
  };

  const handleInputChange = () => {
    setInputValue(searchRef.current.value);
  };

  const handleDeleteCard = (card) => {
    // Use the updateCards function from context to update cards
    const newCards = cards.filter((c) => c.id !== card.id);
    updateCardsContext(newCards);
  };

  useEffect(() => {
    for (let i = 1; i <= columns; i++) {
      if (inputValue === "") {
        const array = cards.slice((i - 1) * 5, i * 5);
        dividedCardsArr.push(array);
      }
      if (inputValue !== "") {
        const array = cards
          .filter(
            (card) =>
              card.georgian.startsWith(inputValue) ||
              card.english.startsWith(inputValue)
          )
          .slice((i - 1) * 5, i * 5);
        dividedCardsArr.push(array);
      }
    }

    setCardsOnCurrentPage(
      dividedCardsArr.slice((currentPage - 1) * 3, currentPage * 3)
    );
  }, [inputValue, currentPage, cards]);

  const nextPage = () => {
    if (currentPage !== pages)
      searchParams.set("page", (currentPage + 1).toString());
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    if (currentPage !== 1)
      searchParams.set("page", (currentPage - 1).toString());
    setSearchParams(searchParams);
  };

  return (
    <div>
      <MainDiv>
        <SecondaryDiv>
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
          <button onClick={handleLanguageChange}>
            {language} {t("mainLanguage")}
          </button>
        </SecondaryDiv>
        <CardsDiv>
          {cardsOnCurrentPage.map((innerArray, index) => (
            <CardColumnDiv key={index}>
              {innerArray.map((card) => (
                <CardComponent
                  key={card.id}
                  CardObject={card}
                  onDelete={() => handleDeleteCard(card)}
                  language={language}
                />
              ))}
            </CardColumnDiv>
          ))}
        </CardsDiv>

        {pages > 0 && (
          <AllCardsPagination
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={currentPage}
            pages={pages}
          />
        )}
      </MainDiv>
      {cards.length === 0 && (
        <EmptyDiv>
          <div> </div>
          <p>{t("cardsNotAdded")}</p>
        </EmptyDiv>
      )}
    </div>
  );
}
