import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import HeroImg from "../../../assets/images/hero.png";
import AddEditCardForm from "../../../components/AddEditCardForm";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { t } = useTranslation();
  return (
    <div>
      <div className="py-[70px] max-[1024px]:bg-[url('assets/images/hero-responsive.png')] bg-darkBlue">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="lg:grid grid-cols-2 gap-16">
            <div className="max-[768px]:text-center">
              <h1 className="mt-[50px] mb-[37px] text-[#fff] text-[42px] font-bold font-helvetica font-case max-[768px]:text-[34px] max-[768px]:mb-[25px]">
                {t("createCardText")}
              </h1>
              <p className="text-lightYellow text-xl font-bold mb-[75px] max-[768px]:mb-[40px]">
                {t("enjoyLearnText")}
              </p>
              <button
                className="bg-[#1ACD81] hover:bg-[#0fa968] text-[#fff] font-bold rounded-[30px] w-[294px] h-[47px]  p-[10px] gap-[10px]"
                onClick={() => setModalOpen(true)}
              >
                {t("startText")}
              </button>
            </div>
            <div className="max-[1024px]:hidden">
              <img src={HeroImg} alt="hero-img" />
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <AddEditCardForm
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          modal={true}
        />
      )}
    </div>
  );
};

export default Hero;
