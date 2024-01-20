import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import Pagination from "./Pagination";

const ProgressHistoryList = () => {
  const { t } = useTranslation();

  const dataList = [
    { id: 1, result: 67, resultTime: "09/09/2023" },
    { id: 2, result: 67, resultTime: "09/09/2023" },
    { id: 3, result: 67, resultTime: "09/09/2023" },
    { id: 4, result: 67, resultTime: "09/09/2023" },
    { id: 5, result: 67, resultTime: "09/09/2023" },
    { id: 6, result: 67, resultTime: "09/09/2023" },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = dataList.slice(startIndex, endIndex);

  return (
    <>
      {currentItems.map((item) => {
        return (
          <div
            className={
              item.id % 2 == 0
                ? "bg-[#F0F0F0] p-8 rounded-md mb-12 w-full"
                : "p-8 rounded-md mb-12 w-full"
            }
            key={item.id}
          >
            <div className="flex justify-between max-[1024px]:flex-col">
              <div>
                <h3>{t("yourResult")} :</h3>
                <h2 className="mt-3 text-lg font-bold">{item.result} | 100%</h2>
              </div>
              <div>
                <h3>{t("numberOfQuestionsSelected")} :</h3>
                <h2 className="mt-3 text-lg font-bold">10</h2>
              </div>
              <div>
                <h3>{t("numberOfSuccessfullyQuestions")} :</h3>
                <h2 className="mt-3 text-lg font-bold">7</h2>
              </div>
              <div className="mr-14">
                <h3>{t("ResultTime")} :</h3>
                <h2 className="mt-3 text-lg font-bold">{item.resultTime}</h2>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex justify-center">
        <Pagination
          data={dataList}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default ProgressHistoryList;
