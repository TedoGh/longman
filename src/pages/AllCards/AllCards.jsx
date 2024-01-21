import { useTranslation } from "react-i18next";
import CardComponent from "./Components/CardComponent";
import AllCardsPagination from "./Components/AllCardsPagination";
import { styled } from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useCardsDataContext } from "../../Context/CardsContext";
import { useAuthorizationContext } from "../../Context/AuthorizationContext";
import useRequest from "../../hooks/useRequest";
import { TailSpin } from "react-loader-spinner";
import FunctionalPart from "./Components/FunctionalPart";
import Cards from "./Components/Cards";

const MainDiv = styled.div`
  height: 1160px;
  background-color: #282a35;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1024px) {
    height: 980px;
  }

  @media (max-width: 767px) {
    height: 1050px;
  }
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
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    color: #b6b6b9;
  }
  @media (max-width: 1024px) {
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
      font-size: 24px;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: 0em;

      color: #b6b6b9;
    }
  }
`;

const P = styled.p`
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  color: #b6b6b9;
  margin-top: 100px;
  @media (max-width: 1024px) {
    margin-top: 209px;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
  }

  @media (max-width: 767px) {
    margin-top: 203px;
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
  }
`;



const LoadingDiv = styled.div`
  position: fixed;
  top: 50%;
`;
export default function AllCards() {
  const { cards, updateCardsContext } = useCardsDataContext();
  const { user, loading } = useAuthorizationContext();
  const [userObject, setUserObject] = useState();
  const { t } = useTranslation();
  const dividedCardsArr = [];
  const searchRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  // user ისეტება login-ის დროს, თუ არ გვყავს user, მაშინ ყველგან ვიყენებთ localstorage-დან წამოღებულ ქარდებს
  const columns =
    inputValue === ""
      ? Math.ceil(user ? user.cards?.length / 5 : cards?.length / 5)
      : Math.ceil(
          user
            ? user.cards?.filter(
                (card) =>
                  card.georgian.toLowerCase().startsWith(inputValue) ||
                  card.foreign.toLowerCase().startsWith(inputValue)
              )?.length / 5
            : cards.filter(
                (card) =>
                  card.georgian.toLowerCase().startsWith(inputValue) ||
                  card.foreign.toLowerCase().startsWith(inputValue)
              ).length / 5
        );
  // 5 ზე გაყოფით ვიგებ რამდენი სვეტია სულ ქარდების, რადგან თითოეულ სვეტში მაქსიმუმ 5 ქარდია      
  const [searchParams, setSearchParams] = useSearchParams();
  const [cardsOnCurrentPage, setCardsOnCurrentPage] = useState([]);
  const [language, setLanguage] = useState("FRGN");
  const [pages, setPages] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { updateUser } = useRequest();
  let currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  

  const handleInputChange = () => {
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    setInputValue(searchRef.current.value.toLowerCase());
  };

  useEffect(() => {
    if (userObject !== undefined && user) {
      updateUser(userObject, userObject._uuid, "deleteCard");
    }
  }, [userObject]);

  const handleDeleteCard = async (card) => {
    if (user) {
      const copiedObject = JSON.parse(JSON.stringify(user));
      const filteredCards = user.cards?.filter((c) => card.id !== c.id);
      setUserObject({ ...copiedObject, cards: filteredCards });
    } else {
      const newCards = cards.filter((c) => c.id !== card.id);
      updateCardsContext(newCards);
    }
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    console.log(screenWidth);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  // იქმნება ქარდების ხუთეული მასივები, და შემდეგ იმისდა მიხედვით რომელ გვერდზე ვართ ვირჩევთ ამ ხუთეულების სამეულს
  // screenwidth-ზე რესპონსივის გამოა დამოკიდებული
  useEffect(() => {
    for (let i = 1; i <= columns; i++) {
      if (inputValue === "") {
        const array = user
          ? user.cards?.slice((i - 1) * 5, i * 5)
          : cards.slice((i - 1) * 5, i * 5);
        dividedCardsArr.push(array);
      }
      if (inputValue !== "") {
        if (language === "GEO") {
          const array = user
            ? user.cards?.filter((card) =>
                  card.georgian.toLowerCase().startsWith(inputValue)
                )
                .slice((i - 1) * 5, i * 5)
            : cards
                .filter((card) =>
                  card.georgian.toLowerCase().startsWith(inputValue)
                )
                .slice((i - 1) * 5, i * 5);
          dividedCardsArr.push(array);
        }
        if (language === "FRGN") {
          const array = user
            ? user.cards?.filter((card) =>
                  card.foreign.toLowerCase().startsWith(inputValue)
                )
                .slice((i - 1) * 5, i * 5)
            : cards
                .filter((card) =>
                  card.foreign.toLowerCase().startsWith(inputValue)
                )
                .slice((i - 1) * 5, i * 5);
          dividedCardsArr.push(array);
        }
      }
    }

    if (screenWidth > 1024) {
      setPages(Math.ceil(columns / 3));
      setCardsOnCurrentPage(
        dividedCardsArr.slice((currentPage - 1) * 3, currentPage * 3)
      );
    }
    if (screenWidth <= 1024 && screenWidth > 767) {
      setPages(Math.ceil(columns / 2));
      setCardsOnCurrentPage(
        dividedCardsArr.slice((currentPage - 1) * 2, currentPage * 2)
      );
    }
    if (screenWidth <= 767) {
      setPages(Math.ceil(columns));
      setCardsOnCurrentPage(
        dividedCardsArr.slice((currentPage - 1) * 1, currentPage * 1)
      );
    }
  }, [inputValue, cards, currentPage, screenWidth, user]);

  useEffect(() => {
    if (currentPage > pages) {
      searchParams.set("page", pages);
      setSearchParams(searchParams);
    }
  }, [pages]);

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
        <FunctionalPart language={language} setLanguage = {setLanguage} cardsOnCurrentPage = {cardsOnCurrentPage} inputValue = {inputValue} searchRef = {searchRef} handleInputChange ={ handleInputChange} />
        {loading && (
          <LoadingDiv>
            <TailSpin
              visible={true}
              width="120"
              height="120"
              color="#04AA6D"
              ariaLabel="tail-spin-loading"
              radius="1"
            />
          </LoadingDiv>
        )}
        
          <Cards cardsOnCurrentPage = {cardsOnCurrentPage} handleDeleteCard = {handleDeleteCard} language = {language} />
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
        {user && !user.cards && (
          <div>
            <div> </div>
            <P>{t("cardsNotAdded")}</P>
          </div>
        )}
        {!user && cards.length === 0 && (
          <div>
            <div> </div>
            <P>{t("cardsNotAdded")}</P>
          </div>
        )}
      </MainDiv>
    </div>
  );
}
