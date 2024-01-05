import React from "react";
import { useState, useRef, useEffect } from "react";
import { set } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import useLocalStorageCards from "../hooks/useLocalStorage";
import { useCardsDataContext } from "../pages/Context/CardsContext";

const P = styled.p`
  font-weight: 700;
  font-size: 25px;
  line-height: 28.75px;
`;

const ErrorText = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 17.25px;
  color: #e10000;
  padding-top: 5px;
`;

const Input = styled.input`
  border: ${({ error }) => (error ? "1px solid red" : "")};
`;

const AddCardForm = ({ modal, modalOpen, setModalOpen }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    id: "",
    english: "",
    georgian: "",
  });

  console.log(formData.georgian.length);
  async function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10);
    return `${timestamp}-${randomNum}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [validationError, setValidationError] = useState({
    firstInput: false,
    secondInput: false,
  });

  const { addCardsContext } = useCardsDataContext();

  const generateId = async () => {
    try {
      const uniqueId = await generateUniqueId();
      setFormData((prevData) => ({ ...prevData, id: uniqueId }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError({ firstInput: false, secondInput: false });

    if (formData.georgian.trim().length < 1) {
      setValidationError((prev) => ({ ...prev, firstInput: true }));
    }

    if (formData.english.trim().length < 1) {
      setValidationError((prev) => ({ ...prev, secondInput: true }));
    }

    if (
      formData.georgian.trim().length >= 1 &&
      formData.english.trim().length >= 1
    ) {
      try {
        const id = await generateUniqueId();
        const updatedFormData = { ...formData, id };
        addCardsContext(updatedFormData);
        toast.success(t("cardsSucessfullyAdded"));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setFormData((prev) => ({ ...prev, georgian: "", english: "" }));
      }
    }
  };

  const handleClickOutside = (e) => {
    if (!modalRef.current.contains(e.target)) setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "visible";
      };
    }
  }, [modalOpen]);

  const containerClass = modal
    ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[365px] sm:w-[555px] h-[469px] rounded-lg overflow-hidden flex justify-center"
    : "flex justify-center mt-6 mb-10";

  const formClass = modal
    ? "w-[365px] sm:w-[555px] h-[469px] bg-[white] flex flex-col justify-center items-center gap-12 rounded-lg"
    : "w-[365px] sm:w-[555px] h-[469px] bg-lightBlue flex flex-col justify-center items-center gap-12 rounded-lg";

  const inputClass = modal
    ? "rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[340px] sm:w-[466px] h-[67px] p-2"
    : "rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[340px] sm:w-[466px] h-[67px] p-2";

  const buttonClass = modal
    ? "p-2 rounded-[24px] w-[302px] sm:w-[466px] h-[49px] bg-bgPlaceBorder text-[white]"
    : "p-2 rounded-[24px] w-[302px] sm:w-[466px] h-[49px] bg-bgPlaceBorder text-[white]";

  const overlayClass = modal
    ? "w-screen h-screen fixed top-0 left-0 z-40 backdrop-filter backdrop-blur-sm"
    : "";

  return (
    <div>
      {modal && <div className={overlayClass}></div>}

      <div className={containerClass}>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={formClass}
          ref={modalRef}
        >
          {modal && <P>{t("createCardText")}</P>}
          <div>
            <Input
              error={validationError.firstInput}
              type="text"
              name="georgian"
              value={formData.georgian}
              onChange={handleChange}
              placeholder={t("addCardPlaceGeoText")}
              className={inputClass}
            />
            {validationError.firstInput && (
              <ErrorText>{t("validationError")}</ErrorText>
            )}
          </div>
          <div>
            <Input
              error={validationError.secondInput}
              type="text"
              name="english"
              value={formData.english}
              onChange={handleChange}
              placeholder={t("addCardPlaceEngText")}
              className={inputClass}
            />
            {validationError.secondInput && (
              <ErrorText>{t("validationError")}</ErrorText>
            )}
          </div>
          <button type="submit" className={buttonClass}>
            {t("addCardBNText")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCardForm;
