import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import { SlOptions } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import useLocalStorageCards from "../../../hooks/useLocalStorage";
import { Input } from "postcss";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import RecycleBin from "../../../assets/images/RecycleBin.png";
import Circle from "../../../assets/images/Circle.png";
import { useCardsDataContext } from "../../../Context/CardsContext";
import { useAuthorizationContext } from "../../../Context/AuthorizationContext";
import useRequest from "../../../hooks/useRequest";
import AddEditCardForm from "../../../components/AddEditCardForm";

const CardDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 79px;
  width: 267px;
  border-radius: 5px;
  background-color: ${({ mainSide }) => (mainSide ? "#04AA6D" : "#FFF4A3")};

  & p {
    font-size: 24px;
    font-weight: 700;
    color: ${({ mainSide }) => (mainSide ? "#FFFFFF" : "#282A35")};
  }

  & button {
    width: 17.5px;
    height: 3.5px;
    position: absolute;
    top: 10px;
    right: 20px;
    color: ${({ mainSide }) => (mainSide ? "#FFFFFF" : "#282A35")};
  }

  @media (max-width: 1024px) {
    height: 59px;
    width: 201px;
    border-radius: 4px;
    & p {
      font-size: 18px;
      font-weight: 700;
    }
    & button {
      width: 17.5px;
      height: 3.5px;
      top: 10px;
      right: 20px;
    }
  }

  @media (max-width: 767px) {
    height: 79px;
    width: 261px;
    border-radius: 4px;
    & p {
      font-size: 24px;
      font-weight: 700;
      line-height: 27px;
    }
    & button {
      width: 17.5px;
      height: 3.5px;
      top: 10px;
      right: 20px;
    }
  }
`;

const MenuDiv = styled.div`
  background-color: #f9f9f9;
  padding-top: 5px;
  height: 106px;
  width: 175px;
  position: absolute;
  right: ${(props) => {
    return props.index === 2 ? "40px" : "-135px";
  }};
  top: 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 40;
  border-radius: 5px;

  & button {
    font-size: 18px;
    font-weight: 400;
  }

  & .editBtn {
    position: relative;
    color: #282a35;
    left: 35px;
  }

  & .editIcon {
    position: absolute;
    right: 20px;
    top: 5px;
  }

  & .deleteBtn {
    color: #e10000;
    left: 35px;
    top: 40px;
    white-space: nowrap;
    position: relative;
  }

  & .deleteIcon {
    position: absolute;
    right: 20px;
    top: 5px;
  }

  @media (max-width: 1024px) {
    & button {
      font-size: 18px;
      font-weight: 400;
    }

    & .editBtn {
      left: 35px;
    }

    & .editIcon {
      right: 20px;
      top: 5px;
    }

    & .deleteBtn {
      left: 35px;
      top: 40px;
    }

    & .deleteIcon {
      right: 20px;
      top: 5px;
    }
  }

  @media (max-width: 767px) {
    right: -50px;

    & button {
      font-size: 18px;
      font-weight: 400;
    }
  }
`;

const ModalDiv = styled.div`
  & .mainDiv {
    position: absolute;
    width: 678px;
    height: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    z-index: 40;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    justify-items: center;
    align-items: center;
    padding-top: 50px;
    border-radius: 10px;

    & h2 {
      font-size: 30px;
      font-weight: 700;
      line-height: 34px;
      letter-spacing: 0em;
      text-align: left;
      color: #282a35;
      padding-top: 18px;
    }

    & p {
      font-size: 24px;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
      color: #8c8c8c;
      padding-top: 25px;
    }

    & .buttonsDiv {
      padding-top: 28px;
      display: flex;
      flex-direction: row;
      gap: 28px;

      & button {
        font-size: 18px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: left;
        width: 294px;
        height: 47px;
        border-radius: 30px;
        text-align: center;
      }

      & .back {
        color: #ffffff;
        background-color: #acacac;
      }

      & .delete {
        color: #ffffff;
        background-color: #e10000;
      }
    }

    & .Circle {
      width: 135px;
      height: 135px;
    }

    & .RecycleBin {
      position: absolute;
      top: 83px;
    }
  }

  & .overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
    backdrop-filter: blur(2px);
  }
  @media (max-width: 1024px) {
    & .mainDiv {
      position: absolute;
      width: 378px;
      height: 255px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      z-index: 40;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      justify-items: center;
      align-items: center;
      padding-top: 32px;
      border-radius: 5px;

      & h2 {
        font-size: 18px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
        color: #282a35;
        padding-top: 11px;
      }

      & p {
        font-size: 14px;
        font-weight: 700;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: left;
        color: #8c8c8c;
        padding-top: 13px;
      }

      & .buttonsDiv {
        padding-top: 20px;
        display: flex;
        flex-direction: row;
        gap: 16px;

        & button {
          font-size: 13px;
          font-weight: 400;
          line-height: 14px;
          letter-spacing: 0em;
          text-align: left;
          width: 164px;
          height: 35px;
          border-radius: 35px;
          text-align: center;
        }

        & .back {
          color: #ffffff;
          background-color: #acacac;
        }

        & .delete {
          color: #ffffff;
          background-color: #e10000;
        }
      }

      & .Circle {
        width: 75px;
        height: 75px;
      }

      & .RecycleBin {
        position: absolute;
        top: 47px;
        width: 45px;
        height: 45px;
      }
    }

    & .overlay {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 12;
      backdrop-filter: blur(2px);
    }
  }
`;

const CardComponent = ({ CardObject, onDelete, language, index }) => {
  const { t } = useTranslation();
  const [side, setSide] = useState(language);
  const [mainSide, setMainSide] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editSession, setEditSession] = useState(false);
  const [card, setCard] = useState(CardObject);
  const [deletePermission, setDeletePermission] = useState(false);
  const menuBtnRef = useRef(null);
  const menuDivRef = useRef(null);
  const modalRef = useRef(null);
  const { deleteCard, editCard } = useLocalStorageCards("languageCards", []);
  const { cards, updateCards, editCardContext } = useCardsDataContext();
  const [userObject, setUserObject] = useState();
  const { updateUser } = useRequest();
  const { user } = useAuthorizationContext();

  const handleRotate = (e) => {
    if (
      !menuBtnRef.current.contains(e.target) &&
      !menuDivRef.current?.contains(e.target) &&
      !editSession
    ) {
      if (side === "FRGN") {
        setSide("GEO");
      } else {
        setSide("FRGN");
      }
      setMainSide((prev) => !prev);
    }
  };

  const handleClickMenu = (e) => {
    if (menuBtnRef.current.contains(e.target)) setMenuOpen((prev) => !prev);
  };

  const handleClickOutsideMenu = (e) => {
    if (!menuDivRef.current.contains(e.target)) setMenuOpen(false);
  };

  const handleClickOutsideModal = (e) => {
    if (!modalRef.current.contains(e.target)) setDeletePermission(false);
  };

  const handleEditClick = () => {
    setEditSession(true);
    setMenuOpen(false);
  };

  const handleClickOnDelete = () => {
    setMenuOpen(false);
    setDeletePermission(true);
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [menuOpen]);

  const handleDelete = () => {
    onDelete();
    setDeletePermission(false);
  };

  useEffect(() => {
    if (deletePermission) {
      document.addEventListener("mousedown", handleClickOutsideModal);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [deletePermission]);

  useEffect(() => {
    setSide(language);
  }, [language]);

  return (
    <div>
      <CardDiv onClick={(e) => handleRotate(e)} mainSide={mainSide}>
        <button
          onClick={(e) => handleClickMenu(e)}
          ref={menuBtnRef}
          disabled={editSession}
        >
          <SlOptions />
        </button>
        {menuOpen && (
          <MenuDiv index={index} ref={menuDivRef}>
            <button onClick={handleEditClick} className="editBtn">
              <FiEdit2 className="editIcon" />
              {t("edit")}{" "}
            </button>
            <button className="deleteBtn" onClick={handleClickOnDelete}>
              {" "}
              <RiDeleteBinLine className="deleteIcon" /> {t("deleteCard")}
            </button>
          </MenuDiv>
        )}
        {!editSession && (
          <p>{side === "FRGN" ? card.foreign : card.georgian}</p>
        )}
      </CardDiv>

      {deletePermission && (
        <ModalDiv>
          <div className="overlay"></div>
          <div className="mainDiv" ref={modalRef}>
            <img src={RecycleBin} className="RecycleBin" alt="" />
            <img src={Circle} className="Circle" alt="" />
            <h2>{t("deleteCardText")}</h2>
            <p>{t("deleteCautionText")}</p>
            <div className="buttonsDiv">
              <button
                className="back"
                onClick={() => setDeletePermission(false)}
              >
                {t("backText")}
              </button>
              <button className="delete" onClick={handleDelete}>
                {t("delete")}
              </button>
            </div>
          </div>
        </ModalDiv>
      )}
      {editSession && (
        <AddEditCardForm
          modal={true}
          modalOpen={editSession}
          setModalOpen={setEditSession}
          card={card}
          setCard={setCard}
          CardObject={CardObject}
        />
      )}
    </div>
  );
};

export default CardComponent;
