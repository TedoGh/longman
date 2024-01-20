import { useTranslation } from "react-i18next";
import { useState } from "react";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

const NotLoggedUser = () => {
  const { t } = useTranslation();

  const [activeButton, setActiveButton] = useState("signUp");
  const [authorizationModal, setAuthorizationModal] = useState();

  const handleClick = (button) => {
    setActiveButton(button);
    setAuthorizationModal(button);
  };
  return (
    <div className="flex justify-center items-center h-screen flex-col p-5">
      <h1 className="text-center text-darkBlue text-2xl font-bold mb-8">
        {t("AuthorizationRequired")}
      </h1>
      <div className="flex flex-col lg:flex-row gap-5">
        <button
          className="bg-[#1ACD81] hover:bg-[#0fa968] text-[#fff] font-bold rounded-[30px] w-[180px] h-[47px]  p-[10px]"
          active={activeButton === "signIn"}
          onClick={() => handleClick("signIn")}
        >
          {t("login")}
        </button>
        <button
          className="bg-[#1ACD81] hover:bg-[#0fa968] text-[#fff] font-bold rounded-[30px] w-[180px] h-[47px]  p-[10px]"
          active={activeButton === "signUp"}
          onClick={() => handleClick("signUp")}
        >
          {t("signUp")}
        </button>

        {authorizationModal === "signIn" && (
          <SignInModal
            authorizationModal={authorizationModal}
            setAuthorizationModal={setAuthorizationModal}
            handleClick={handleClick}
          />
        )}
        {authorizationModal === "signUp" && (
          <SignUpModal
            authorizationModal={authorizationModal}
            setAuthorizationModal={setAuthorizationModal}
            handleClick={handleClick}
          />
        )}
      </div>
    </div>
  );
};

export default NotLoggedUser;
