import React from "react";
import AlertCircle from "../../../../src/assets/images/AlertCircle.png";
import AlertIcon from "../../../../src/assets/images/AlertIcon.png";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
const MainDiv = styled.div`
  width: 678px;
  height: 456px;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  border-radius: 10px;
  overflow: hidden;

  & h2 {
    font-size: 30px;
    font-weight: 700;
    line-height: 34px;
    letter-spacing: 0em;
    text-align: left;
    color: #282a35;
    margin-top: 19px;
    margin-bottom: 23px;
  }
  & p {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: center;
    color: #8c8c8c;
    margin-bottom: 38px;
  }

  & img {
  }
  & .circle {
    width: 135px;
    height: 135px;
    margin-top: 59px;
  }
  & .icon {
    position: absolute;
    top: 90px;
    height: 70px;
    width: 70px;
  }
  & div {
    display: flex;
    flex-direction: row;
    gap: 26px;

    & button {
      width: 294px;
      height: 56px;
      border-radius: 30px;
      border: 1px solid #04aa6d;
      font-size: 18px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: 0em;
      text-align: center;
    }
    & .continue {
      color: #04aa6d;
      background-color: #ffffff;
    }

    & .leave {
      color: #ffffff;
      background-color: #04aa6d;
    }
  }
  @media (max-width: 1024px) {
    width: 380px;
    height: 255px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    border-radius: 5.6px;

    & h2 {
      font-size: 18px;

      line-height: 20px;
      margin-top: 19px;
      margin-bottom: 11px;
    }
    & p {
      font-size: 14px;

      line-height: 16px;

      margin-bottom: 22px;
    }

    & .circle {
      width: 75px;
      height: 75px;
      margin-top: 32px;
    }
    & .icon {
      position: absolute;
      top: 43px;
      height: 50px;
      width: 50px;
    }
    & div {
      gap: 15px;

      & button {
        width: 165px;
        height: 35px;
        border-radius: 17px;

        font-size: 13px;

        line-height: 14px;
      }
    }
  }
  @media (max-width: 767px) {
    width: 358px;
    height: 240px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5.6px;

    & h2 {
      font-size: 16px;

      line-height: 18px;
      margin-top: 10px;
      margin-bottom: 12px;
    }
    & p {
      font-size: 13px;

      line-height: 15px;

      margin-bottom: 19px;
    }

    & .circle {
      width: 60px;
      height: 60px;
      margin-top: 30px;
    }
    & .icon {
      position: absolute;
      top: 38px;
      height: 40px;
      width: 40px;
    }
    & div {
      gap: 15px;

      & button {
        width: 155px;
        height: 31px;
        border-radius: 15px;

        font-size: 11px;

        line-height: 12px;
      }
    }
  }
`;
const ConfirmationModal = ({ setActive, setExitModalOpen }) => {
  const { t } = useTranslation();
  const handleContinue = () => {
    setExitModalOpen(false);
  };

  const handleFinish = () => {
    setActive(false);
  };
  return (
    <MainDiv>
      <img className="circle" src={AlertCircle} alt="" />
      <img className="icon" src={AlertIcon} alt="" />
      <h2>{t("cancelTrainingPromptText")}</h2>
      <p>{t("resultsNotSavedText")}</p>
      <div>
        <button onClick={handleContinue} className="continue">
          {t("continue")}
        </button>
        <button onClick={handleFinish} className="leave">
          {t("leave")}
        </button>
      </div>
    </MainDiv>
  );
};

export default ConfirmationModal;
