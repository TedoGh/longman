import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ConfirmationModal from "./ConfirmationModal";
import { AiOutlineClose } from "react-icons/ai";

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
  width: 579px;
  height: 662px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;

  position: relative;

  & .x {
    font-size: 30px;
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
  margin-top: 12px;
  font-size: 22px;

  & .text-xl {
    font-size: 22px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
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
  font-size: 24.3px;
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
  width: 335px;
  height: 110px;
  background: #04aa6d;
  color: #fff;
  font-weight: bold;
  font-size: 36.52px;
  border-radius: 7.61px;
  margin-top: 51px;
  margin-bottom: 61px;
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
  height: 80px;
  width: 223px;
  border-radius: 7px;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;

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

  & .backbtn {
    background-color: #acacac;
  }

  & .confirmbtn {
    background-color: #04aa6d;
  }
  @media (max-width: 1024px) {
    gap: 13px;
  }
  @media (max-width: 767px) {
    gap: 12px;
  }
`;

const StyledButton = styled.button`
  color: #fff;
  padding: 2.5;
  border-radius: 30px;
  width: 193px;
  height: 44px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 60px;
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
`;

const GuessCard = ({
  active,
  setActive,
  cards,
  selectedNumber,
  languageState,
}) => {
  const modalRef = useRef(null);
  const finishModalRef = useRef(null);
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const questionCards = [];

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setExitModalOpen(true);
    }

    if (finishModalRef.current && !finishModalRef.current.contains(e.target)) {
      setActive(false);
    }
  };

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
      let index = Math.floor(Math.random() * selectedNumber + 1);
      if (!indexArr.includes(index)) {
        indexArr.push(index);
      } else {
        i = i - 1;
      }
    }

    indexArr.forEach((i) => questionCards.push(cards[i]));

    questionCards.forEach((card, i) => {
      const randomCardsArr = [];
      let randomOptionsArr = [];
      const excludedCardsArr = cards?.filter((item) => card?.id !== item?.id);
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
        questionObj.correct = card?.english;

        for (let i = 0; i < 4; i++) {
          questionObj.options[i] = arrayWithCorrectAnswer[i]?.english;
        }
      }
      if (languageState === "ENG") {
        questionObj.question = card?.english;
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

  const confirmNext = () => {
    if (
      questionsArray[questionIndex]?.submited === true &&
      questionIndex === selectedNumber - 1
    ) {
      setExamFinished(true);
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
    setActive(false);
  };

  const handleReviewQuestions = () => {
    setQuestionIndex(selectedNumber - 1);
    setExamFinished(false);
  };

  useEffect(() => {
    console.log(wrongAnswers, correctAnswers);
  }, [questionIndex]);

  return (
    <div>
      <div className="w-screen h-screen fixed top-0 left-0 z-40 backdrop-filter backdrop-blur-sm" />
      {!exitModalOpen && !examFinished && (
        <StyledModalContainer>
          <StyledModalContent ref={modalRef}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <StyledStepIndicator>
                <div className="text-xl">{questionIndex + 1}</div>/
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
            <StyledButtonContainer>
              <StyledButton className="backbtn" onClick={back}>
                {t("backText")}
              </StyledButton>
              <StyledButton
                disabled={
                  questionsArray[questionIndex]?.checkedAnswerOption ===
                  undefined
                }
                className="confirmbtn"
                onClick={confirmNext}
              >
                {currentQuestion?.submited === true ? t("next") : t("confirm")}
              </StyledButton>
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
        <StyledModalContainer ref={finishModalRef}>
          <StyledModalContent>
            <h2>{t("sessionFinished")}</h2>
            <p>
              {t("numOfQuestions")}:{selectedNumber}
            </p>
            <p>
              {t("correct")}:{correctAnswers}
            </p>
            <p>
              {t("wrong")}:{wrongAnswers}
            </p>
            <button onClick={handleReviewQuestions}>{t("checkAnswers")}</button>
            <button onClick={handleFinishExam}>{t("finish")}</button>
          </StyledModalContent>
        </StyledModalContainer>
      )}
    </div>
  );
};

export default GuessCard;
