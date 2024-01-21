import React, { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import LogoMain from "../assets/images/LogoMain.png";
import { useTranslation } from "react-i18next";
import { useAuthorizationContext } from "../Context/AuthorizationContext";
import { useNavigate } from "react-router-dom";

const ErrorText = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 17.25px;
  color: #e10000;
  padding-top: 5px;
  align-self: flex-start;
  margin-left: 25px;
`;

const SignInBtn = styled.button`
  background-color: #04aa6d;
  width: 389px;
  height: 45.15px;
  color: white;
  border-radius: 22.55px;

  @media (max-width: 767px) {
    width: 330px;
  }
`;

const Input = styled.input`
  border: ${({ error }) => (error ? "1px solid red" : "1px solid #ACACAC")};
`;

const ForgotPasswordBtn = styled.button`
  align-self: flex-start;
  margin-left: 24px;
  color: #04aa6d;
  font-weight: 400;
  font-size: 16.6px;
`;

const Img = styled.img`
  padding-top: 20px;
  justify-self: flex-start;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  & p {
    color: #acacac;
    font-weight: 400;
    font-size: 16.59px;
  }

  & button {
    color: #04aa6d;
    border: none;
    background: none;
  }
`;

const SignInModal = ({
  setAuthorizationModal,
  authorizationModal,
  handleClick,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const { response, setUser, user } = useAuthorizationContext();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (user) setAuthorizationModal("");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    const email = response.items.find(
      (user) =>
        user?.Email === formData?.Email && user?.Password === formData?.Password
    )?.Email;
    const password = response.items.find(
      (user) =>
        user?.Password === formData?.Password && user?.Email === formData?.Email
    )?.Password;
    if (email !== undefined && password !== undefined) {
      const foundUser = response.items.find(
        (user) => user?.Email === formData?.Email
      );
      setUser(foundUser);
      navigate("/longman")
    } else {
      setError(true);
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setAuthorizationModal("");
    }
  };

  useEffect(() => {
    if (authorizationModal === "signIn") {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "visible";
      };
    }
  }, [authorizationModal]);

  return (
    <div>
      <div className="w-screen h-screen fixed top-0 left-0 z-40 backdrop-filter backdrop-blur-sm"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  rounded-lg overflow-hidden">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-[435px] h-[480px] bg-[white] flex flex-col justify-start gap-6 items-center rounded-lg max-[768px]:w-[365px] animate__animated animate__fadeInDown"
          ref={modalRef}
        >
          <Img src={LogoMain} alt="" />
          <Input
            className="rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[389px] h-[52px] p-2 max-[768px]:w-[330px]"
            type="text"
            placeholder={t("mail")}
            onChange={handleChange}
            name="Email"
            value={formData.Email}
            error={error}
          />
          <Input
            className="rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[389px] h-[52px] p-2 max-[768px]:w-[330px]"
            type="password"
            placeholder={t("password")}
            onChange={handleChange}
            name="Password"
            value={formData.Password}
            error={error}
          />
          {error && <ErrorText>{t("mailOrPasswordIncorect")}</ErrorText>}
          <ForgotPasswordBtn>{t("forgotPassword")}</ForgotPasswordBtn>
          <SignInBtn>{t("login")}</SignInBtn>
          <TextDiv>
            <p>{t("notRegisteredText")}</p>
            <button onClick={() => handleClick("signUp")}>{t("signUp")}</button>
          </TextDiv>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
