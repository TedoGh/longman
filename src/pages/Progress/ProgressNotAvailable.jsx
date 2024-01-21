import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProgressNotAvailable = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center h-screen flex-col px-5">
      <h1 className="text-center text-darkBlue text-2xl font-bold mb-8">
        {t("progressNotAvailable")}
      </h1>
      <button className="bg-[#1ACD81] hover:bg-[#0fa968] text-[#fff] font-bold rounded-[30px] w-[250px] lg:w-[294px] h-[47px]  p-[10px]">
        <Link to={"/longman/train"}>{t("startTrainText")}</Link>
      </button>
    </div>
  );
};

export default ProgressNotAvailable;
