import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ConfirmationModal from "./ConfirmationModal";
import { AiOutlineClose } from "react-icons/ai";
import { useAuthorizationContext } from "../pages/Context/AuthorizationContext";
import useRequest from "../hooks/useRequest";

const StyledModalContainer = styled.div`
  position: fixed;

  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  border-radius: 10px;
  overflow: hidden;
  @media (max-width: 1024px) {
    border-radius: 7.52px;
  }
  @media (max-width: 767px) {
    border-radius: 10px;
  }
`;

const StyledModalContent = styled.div`
  width: 500px;
  height: 500px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;

  position: relative;

  & .x {
    font-size: 25px;
    position: absolute;
    right: 35px;
    top: 16px;
    color: #8c8c8c;
  }
  @media (max-width: 1024px) {
    height: 410px;
    width: 380px;
    border-radius: 10px;

    & .x {
      font-size: 22px;
      right: 28px;
      top: 11px;
    }
  }
  @media (max-width: 767px) {
    height: 385px;
    width: 358px;
    border-radius: 10px;

    & .x {
      font-size: 17px;
      right: 25px;
      top: 10px;
    }
  }
`;

const StyledStepIndicator = styled.div`
  position: absolute;
  left: 38px;
  color: #8c8c8c;
  font-size: base;
  text-align: center;
  display: flex;
  align-items: center;
  margin-top: 14px;
  font-size: 17px;

  & .text-xl {
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    margin-right: 2px;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    left: 33px;
    margin-top: 12px;

    & .text-xl {
      font-size: 14px;
      font-weight: 400;
      line-height: 23px;
    }
  }
  @media (max-width: 767px) {
    font-size: 11px;
    left: 20px;
    margin-top: 12px;

    & .text-xl {
      font-size: 11px;
      font-weight: 400;
      line-height: 14px;
    }
  }
`;

const StyledTitle = styled.div`
  font-size: 22.3px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 18px;
  @media (max-width: 1024px) {
    font-size: 16px;
    line-height: 18px;
    margin-top: 14px;
  }
  @media (max-width: 767px) {
    font-size: 15px;
    line-height: 18px;
    margin-top: 10px;
  }
`;

const StyledAnswerButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 85px;
  background: #04aa6d;
  color: #fff;
  font-weight: bold;
  font-size: 32.52px;
  font-size: 30.52px;
  border-radius: 7.61px;
  margin-top: 51px;
  margin-bottom: 41px;

  @media (max-width: 1024px) {
    width: 227px;
    height: 66px;
    font-size: 20px;
    border-radius: 6px;
    margin-top: 42px;
    margin-bottom: 26px;
  }
  @media (max-width: 767px) {
    width: 214px;
    height: 63px;
    font-size: 19.52px;
    border-radius: 4.1px;
    margin-top: 29px;
    margin-bottom: 33px;
  }
`;

const StyledAnswerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 21px;
  @media (max-width: 1024px) {
    gap: 14px;
  }
  @media (max-width: 767px) {
    gap: 12px;
  }
`;

const StyledAnswerOption = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 210px;
  border-radius: 7px;
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: center;

  color: ${(props) => {
    if (props.isCorrect || props.isWrong) {
      return "#FFFFFF";
    }
    return "#282A35";
  }};

  background-color: ${(props) => {
    if (props.active && props.isCorrect) {
      return "#04AA6D";
    }
    if (props.isCorrect) {
      return "#04AA6D";
    }
    if (props.active && props.isWrong) {
      return "#E10000";
    }
    if (props.isWrong) {
      return "#E10000";
    }
    if (props.active && !props.isWrong && !props.isCorrect) {
      return "#FFF4A3";
    }
    return "#E7E7E7";
  }};
  @media (max-width: 1024px) {
    height: 50px;
    width: 162px;
    border-radius: 7px;
    font-size: 14px;
    font-weight: 700;
    line-height: 15px;
  }
  @media (max-width: 767px) {
    height: 52px;
    width: 152px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 700;
    line-height: 14px;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 24px;

  & button {
    color: #fff;
    padding: 2.5;
    border-radius: 30px;
    width: 143px;
    height: 30px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    margin-top: 30px;

    @media (max-width: 1024px) {
      padding: 2.5;
      border-radius: 30px;
      width: 162px;
      height: 35px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 400;
      line-height: 14px;
      margin-top: 30px;
    }
    @media (max-width: 767px) {
      padding: 2.5;
      border-radius: 16px;
      width: 152px;
      height: 34px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 400;
      line-height: 13px;
      margin-top: 32px;
    }
  }

  & .backbtn {
    width: 200px;
    height: 44px;
    color: ${(props) => (props.questionIndex === 0 ? "#A3A3A3" : "#04AA6D")};
    background-color: white;
    border: ${(props) =>
      props.questionIndex === 0 ? "1px solid #A3A3A3" : "1px solid #04AA6D"};
  }

  & .confirmbtn {
    width: 200px;
    height: 44px;
    color: white;
    background-color: ${(props) =>
      props.submited === false ? "#A4A4A4" : "#04AA6D"};
  }

  @media (max-width: 1024px) {
    gap: 13px;
    & .backbtn {
      width: 162px;
      height: 35px;
    }
    & .confirmbtn {
      width: 162px;
      height: 35px;
    }
  }
  @media (max-width: 767px) {
    gap: 12px;
    & .backbtn {
      width: 152px;
      height: 34px;
    }
    & .confirmbtn {
      width: 152px;
      height: 34px;
    }
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & h2 {
    font-size: 42px;
    font-weight: 700;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 52px;
    color: white;
    margin-top: 100px;
  }

  & p {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 35px;
    color: #fff4a3;
  }

  & button {
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    margin-top: 5px;
    color: white;
    background-color: #04aa6d;
    width: 280px;
    height: 40px;
    border-radius: 30px;
    text-align: center;
  }

  & .correct {
    color: #04aa6d;
  }

  @media (max-width: 767px) {
    & h2 {
      font-size: 30px;
      line-height: 34px;
      margin-bottom: 37px;
      margin-top: 90px;
    }

    & p {
      font-size: 18px;
      font-weight: 700;
      line-height: 20px;
      margin-bottom: 23px;
    }

    & button {
      font-size: 15px;
      font-weight: 400;
      line-height: 17px;
      margin-top: 5px;
      width: 202px;
      height: 36px;
      border-radius: 25px;
    }
  }

  @media (max-width: 1024px) {
    & h2 {
      font-size: 24px;
      line-height: 27px;
      margin-bottom: 26px;
      margin-top: 85px;
    }

    & p {
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 20px;
    }

    & button {
      font-size: 10px;
      line-height: 11px;
      margin-top: 5px;
      width: 170px;
      height: 27px;
      border-radius: 17px;
    }
  }
`;

const GuessCard = ({
  active,
  setActive,
  cards,
  selectedNumber,
  languageState,
  examFinished,
  setExamFinished,
}) => {
  const modalRef = useRef(null);

  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const questionCards = [];
  const { user } = useAuthorizationContext();
  const [userObject, setUserObject] = useState();
  const [lastSessionResult, setLastSessionResult] = useState();
  const { updateUser } = useRequest();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setExitModalOpen(true);
    }
  };

  function formatDate(date) {
    const day = addLeadingZero(date.getDate());
    const month = addLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  function handleRecordResult() {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const percentage = ((correctAnswers / selectedNumber) * 100).toFixed(0);
    setLastSessionResult({
      date: formattedDate,
      correct: correctAnswers,
      wrong: wrongAnswers,
      total: selectedNumber,
      percentage: `${percentage}%`,
    });
  }

  useEffect(() => {
    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "visible";
      };
    }
  }, [active]);

  useEffect(() => {
    let indexArr = [];
    const questions = [];
    for (let i = 0; i < selectedNumber; i++) {
      let index = Math.floor(Math.random() * selectedNumber);
      if (!indexArr.includes(index)) {
        indexArr.push(index);
      } else {
        i = i - 1;
      }
    }
    console.log(indexArr);

    indexArr.forEach((i) =>
      questionCards.push(user ? user.cards[i] : cards[i])
    );

    questionCards.forEach((card, i) => {
      const randomCardsArr = [];
      let randomOptionsArr = [];
      const excludedCardsArr = user
        ? user.cards.filter((item) => card?.id !== item?.id)
        : cards?.filter((item) => card?.id !== item?.id);
      for (let i = 0; i < 3; i++) {
        let index = Math.floor(Math.random() * excludedCardsArr.length);
        if (!randomOptionsArr.includes(index)) {
          randomOptionsArr.push(index);
        } else {
          i = i - 1;
        }
      }

      randomOptionsArr.forEach((i) => randomCardsArr.push(excludedCardsArr[i]));

      const questionObj = new Object();
      questionObj.options = new Array(4);
      questionObj.submited = false;
      questionObj.isWrong = undefined;
      questionObj.isCorrect = undefined;
      questionObj.checkedAnswerOption = undefined;
      const randomIndex = Math.floor(Math.random() * 4);
      const arrayWithCorrectAnswer = [
        ...randomCardsArr.slice(0, randomIndex),
        card,
        ...randomCardsArr.slice(randomIndex),
      ];

      if (languageState === "GEO") {
        questionObj.question = card?.georgian;
        questionObj.correct = card?.foreign;

        for (let i = 0; i < 4; i++) {
          questionObj.options[i] = arrayWithCorrectAnswer[i]?.foreign;
        }
      }
      if (languageState === "ENG") {
        questionObj.question = card?.foreign;
        questionObj.correct = card?.georgian;
        for (let i = 0; i < 4; i++) {
          questionObj.options[i] = arrayWithCorrectAnswer[i]?.georgian;
        }
      }

      questions.push(questionObj);
    });
    setQuestionsArray(questions);
  }, [selectedNumber, active, cards]);

  useEffect(() => {
    setCurrentQuestion(questionsArray[questionIndex]);
  }, [questionIndex, questionsArray]);

  const handleCheck = (i) => {
    setQuestionsArray((prev) => [
      ...prev.slice(0, questionIndex),
      { ...currentQuestion, checkedAnswerOption: i },
      ...prev.slice(questionIndex + 1),
    ]);
  };
  const back = () => {
    if (questionIndex === 0) return;

    setQuestionIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (userObject && user) {
      updateUser(userObject, userObject._uuid, "training");
    }
  }, [userObject]);

  useEffect(() => {
    if (lastSessionResult && user) {
      const copiedObject = JSON.parse(JSON.stringify(user));
      setUserObject({
        ...copiedObject,
        trainingData: copiedObject.trainingData
          ? [...copiedObject.trainingData, lastSessionResult]
          : [lastSessionResult],
      });
    }
  }, [lastSessionResult]);

  const confirmNext = () => {
    if (
      questionsArray[questionIndex]?.submited === true &&
      questionIndex === selectedNumber - 1
    ) {
      setExamFinished(true);
      handleRecordResult();
    }
    if (questionsArray[questionIndex]?.submited === true) {
      setQuestionIndex((prev) => prev + 1);

      return;
    }

    const trueIndex = currentQuestion.options.indexOf(currentQuestion.correct);
    if (trueIndex === questionsArray[questionIndex].checkedAnswerOption) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (trueIndex !== questionsArray[questionIndex].checkedAnswerOption) {
      setWrongAnswers((prev) => prev + 1);
    }

    setQuestionsArray((prev) => [
      ...prev.slice(0, questionIndex),
      {
        ...currentQuestion,
        isWrong:
          trueIndex !== questionsArray[questionIndex].checkedAnswerOption
            ? questionsArray[questionIndex].checkedAnswerOption
            : undefined,
        isCorrect: trueIndex,
        submited: true,
      },
      ...prev.slice(questionIndex + 1),
    ]);
  };

  const handleFinishExam = () => {
    setExamFinished(false);
    setActive(false);
  };

  return (
    <div>
      {!examFinished && (
        <div className="w-screen h-screen fixed top-0 left-0 z-40 backdrop-filter backdrop-blur-sm" />
      )}
      {!exitModalOpen && !examFinished && (
        <StyledModalContainer>
          <StyledModalContent ref={modalRef}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <StyledStepIndicator>
                <div className="text-xl">{questionIndex + 1}</div>
                {`/`}
                {selectedNumber}
              </StyledStepIndicator>
              <StyledTitle>{t("guessCard")}</StyledTitle>
              <button className="x" onClick={() => setExitModalOpen(true)}>
                <AiOutlineClose />
              </button>
            </div>
            <StyledAnswerButton>
              {currentQuestion ? currentQuestion.question : ""}
            </StyledAnswerButton>

            <StyledAnswerGrid>
              <StyledAnswerOption
                disabled={questionsArray[questionIndex]?.submited === true}
                isWrong={questionsArray[questionIndex]?.isWrong === 0}
                isCorrect={questionsArray[questionIndex]?.isCorrect === 0}
                active={
                  questionsArray[questionIndex]?.checkedAnswerOption === 0
                }
                onClick={() => handleCheck(0)}
              >
                {currentQuestion ? currentQuestion.options[0] : ""}
              </StyledAnswerOption>
              <StyledAnswerOption
                disabled={questionsArray[questionIndex]?.submited === true}
                isWrong={questionsArray[questionIndex]?.isWrong === 1}
                isCorrect={questionsArray[questionIndex]?.isCorrect === 1}
                active={
                  questionsArray[questionIndex]?.checkedAnswerOption === 1
                }
                onClick={() => handleCheck(1)}
              >
                {currentQuestion ? currentQuestion.options[1] : ""}
              </StyledAnswerOption>
              <StyledAnswerOption
                disabled={questionsArray[questionIndex]?.submited === true}
                isWrong={questionsArray[questionIndex]?.isWrong === 2}
                isCorrect={questionsArray[questionIndex]?.isCorrect === 2}
                active={
                  questionsArray[questionIndex]?.checkedAnswerOption === 2
                }
                onClick={() => handleCheck(2)}
              >
                {currentQuestion ? currentQuestion.options[2] : ""}
              </StyledAnswerOption>
              <StyledAnswerOption
                disabled={questionsArray[questionIndex]?.submited === true}
                isWrong={questionsArray[questionIndex]?.isWrong === 3}
                isCorrect={questionsArray[questionIndex]?.isCorrect === 3}
                active={
                  questionsArray[questionIndex]?.checkedAnswerOption === 3
                }
                onClick={() => handleCheck(3)}
              >
                {currentQuestion ? currentQuestion.options[3] : ""}
              </StyledAnswerOption>
            </StyledAnswerGrid>
            <StyledButtonContainer
              submited={
                currentQuestion?.submited === true ||
                typeof questionsArray[questionIndex]?.checkedAnswerOption ===
                  "number"
              }
              questionIndex={questionIndex}
            >
              <button
                className="backbtn"
                onClick={back}
                disabled={questionIndex === 0}
              >
                {t("backText")}
              </button>
              <button
                disabled={
                  questionsArray[questionIndex]?.checkedAnswerOption ===
                  undefined
                }
                className="confirmbtn"
                onClick={confirmNext}
              >
                {currentQuestion?.submited === true ? t("next") : t("confirm")}
              </button>
            </StyledButtonContainer>
          </StyledModalContent>
        </StyledModalContainer>
      )}
      {exitModalOpen && (
        <ConfirmationModal
          setActive={setActive}
          setExitModalOpen={setExitModalOpen}
        />
      )}
      {examFinished && (
        <ResultContainer>
          <h2>{t("sessionFinished")}</h2>
          <p>
            {t("numOfQuestions")} : {selectedNumber}
          </p>
          <p className="correct">
            {t("correct")} : {correctAnswers}
          </p>
          <p>
            {t("wrong")} : {wrongAnswers}
          </p>
          <button onClick={handleFinishExam}>{t("finish")}</button>
        </ResultContainer>
      )}
    </div>
  );
};

export default GuessCard;
