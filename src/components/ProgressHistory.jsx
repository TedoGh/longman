import { useTranslation } from "react-i18next";
import ProgressHistoryList from "./ProgressHistoryList";

const ProgressHistory = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:mt-[180px] mt-[475px] mb-14 px-4 lg:px-0">
      <div>
        <h1 className="my-8 text-darkBlue text-3xl text-center font-bold">
          {t("myResults")} :
        </h1>
        <ProgressHistoryList />
      </div>
    </div>
  );
};

export default ProgressHistory;
