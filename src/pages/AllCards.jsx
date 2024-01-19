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
import { useAuthorizationContext } from "./Context/AuthorizationContext";
import useRequest from "../hooks/useRequest";

const MainDiv = styled.div`
  height: 1077px;
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

const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-self: ${(props) => {
    return props.cardsOnCurrentPage.length > 2 ? "center" : "flex-start";
  }};
  justify-content: flex-start;
  gap: 160px;
  margin-top: 43px;
  margin-left: 100px;
  margin-right: 100px;

  @media (max-width: 1241px) {
    gap: 100px;
  }

  @media (max-width: 1241px) {
    gap: 90px;
  }

  @media (max-width: 1124px) {
    gap: 80px;
  }

  @media (max-width: 1077px) {
    gap: 70px;
  }

  @media (max-width: 1024px) {
    gap: 200px;
    margin-top: 60px;
    align-self: center;
  }

  @media (max-width: 1000px) {
    gap: 150px;
  }

  @media (max-width: 1000px) {
    gap: 120px;
  }

  @media (max-width: 885px) {
    gap: 90px;
  }

  @media (max-width: 845px) {
    gap: 70px;
  }
  @media (max-width: 767px) {
    align-self: center;
  }
`;

const CardColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  @media (max-width: 1024px) {
    gap: 30px;
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
  margin-top: 260px;
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
export default function AllCards() {
  const { cards, updateCardsContext } = useCardsDataContext();
  const {user} = useAuthorizationContext();
  const [userObject, setUserObject] = useState();
  const { t } = useTranslation();
  const dividedCardsArr = [];
  const searchRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const columns =
    inputValue === ""
      ? Math.ceil(user ? user.cards?.length / 5 : cards?.length / 5)
      : Math.ceil(user ? user.cards.filter(
        (card) =>
          card.georgian.toLowerCase().startsWith(inputValue) ||
          card.english.toLowerCase().startsWith(inputValue)
      ).length / 5 :
          cards.filter(
            (card) =>
              card.georgian.toLowerCase().startsWith(inputValue) ||
              card.english.toLowerCase().startsWith(inputValue)
          ).length / 5
        );
  const [searchParams, setSearchParams] = useSearchParams();
  const [cardsOnCurrentPage, setCardsOnCurrentPage] = useState([]);
  const [language, setLanguage] = useState("ENG");
  const [pages, setPages] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const {updateUser} = useRequest();
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
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    setInputValue(searchRef.current.value.toLowerCase());
  };

  useEffect(()=>{
    if(userObject !== undefined && user) {
      updateUser(userObject,userObject._uuid,'deleteCard')
    }
  },[userObject])

  const handleDeleteCard = async (card) => {
    if(user) {
      const copiedObject = JSON.parse(JSON.stringify(user));
      const filteredCards = user.cards.filter(c => card.id !== c.id )
      setUserObject(({...copiedObject, cards: filteredCards}))
          
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

 
  useEffect(() => {
    
    for (let i = 1; i <= columns; i++) {
      if (inputValue === "") {
        const array = user ? user.cards.slice((i - 1) * 5, i * 5) : cards.slice((i - 1) * 5, i * 5);
        dividedCardsArr.push(array);
      }
      if (inputValue !== "") {
        if (language === "GEO") {
          const array = user ? user.cards
          .filter((card) =>
            card.georgian.toLowerCase().startsWith(inputValue)
          )
          .slice((i - 1) * 5, i * 5)
         :  cards
            .filter((card) =>
              card.georgian.toLowerCase().startsWith(inputValue)
            )
            .slice((i - 1) * 5, i * 5);
          dividedCardsArr.push(array);
        }
        if (language === "ENG") {
          const array = user ?  user.cards
          .filter((card) => card.english.toLowerCase().startsWith(inputValue))
          .slice((i - 1) * 5, i * 5) : cards
            .filter((card) => card.english.toLowerCase().startsWith(inputValue))
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
          {cardsOnCurrentPage.length === 0 && inputValue !== "" && (
            <p className="notFound">{t("cardsNotFound")}</p>
          )}
        </SecondaryDiv>
        <CardsDiv cardsOnCurrentPage={cardsOnCurrentPage}>
          {cardsOnCurrentPage.map((innerArray, index) => (
            <CardColumnDiv key={index}>
              {innerArray.map((card) => (
                <CardComponent
                  index={index}
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
        {cards.length === 0 && (
          <div>
            <div> </div>
            <P>{t("cardsNotAdded")}</P>
          </div>
        )}
      </MainDiv>
    </div>
  );
}
