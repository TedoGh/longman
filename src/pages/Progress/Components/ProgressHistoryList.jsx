import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import Pagination from "../../../components/Pagination";
import { useAuthorizationContext } from "../../../Context/AuthorizationContext";

const ProgressHistoryList = () => {
  const { t } = useTranslation();
  const { user } = useAuthorizationContext();

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = user?.trainingData.slice(startIndex, endIndex);

  return (
    <>
      {user.trainingData &&
        currentItems.map((item, index) => {
          return (
            <div
              className={
                index % 2 == 1
                  ? "bg-[#F0F0F0] p-8 rounded-md mb-12 w-full"
                  : "p-8 rounded-md mb-12 w-full"
              }
              key={item.date}
            >
              <div className="flex justify-between max-[1024px]:flex-col">
                <div>
                  <h3>{t("yourResult")}</h3>
                  <h2 className="mt-3 text-lg font-bold">{item.percentage}</h2>
                </div>
                <div>
                  <h3>{t("numberOfQuestionsSelected")}</h3>
                  <h2 className="mt-3 text-lg font-bold">{item.total}</h2>
                </div>
                <div>
                  <h3>{t("numberOfSuccessfullyQuestions")}</h3>
                  <h2 className="mt-3 text-lg font-bold">{item.correct}</h2>
                </div>
                <div className="mr-14">
                  <h3>{t("ResultTime")}</h3>
                  <h2 className="mt-3 text-lg font-bold">{item.date}</h2>
                </div>
              </div>
            </div>
          );
        })}
      {user.trainingData.length > itemsPerPage && (
        <div className="flex justify-center">
          <Pagination
            data={user.trainingData}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default ProgressHistoryList;
