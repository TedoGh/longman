import ProgressHistory from "./Components/ProgressHistory";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthorizationContext } from "../../Context/AuthorizationContext";
import { useEffect, useState } from "react";
import NotLoggedUser from "../../components/NotLoggedUser";
import ProgressNotAvailable from "./Components/ProgressNotAvailable";

export default function Progress() {
  const { t } = useTranslation();
  const { user } = useAuthorizationContext();
  const [result, setResult] = useState();

  useEffect(() => {
    if (user && user.trainingData) {
      let totalQuestions = 0;
      let totalCorrectAnswers = 0;
      user?.trainingData.forEach(
        (data) => (totalQuestions = totalQuestions + data.total)
      );
      user?.trainingData.forEach(
        (data) => (totalCorrectAnswers = totalCorrectAnswers + data.correct)
      );
      const resultPercentage = (
        (totalCorrectAnswers / totalQuestions) *
        100
      ).toFixed(0);
      console.log(totalQuestions);
      console.log(totalCorrectAnswers);
      console.log(resultPercentage);
      setResult({
        totalCorrectAnswers: totalCorrectAnswers,
        totalQuestions: totalQuestions,
        resultPercentageDigit: resultPercentage,
        resultPercentage: `${resultPercentage}%`,
      });
    }
  }, [user]);

  return (
    <div>
      {user && user.trainingData && (
        <div>
          <div className="max-w-[1200px] mx-auto">
            <div className="px-5 lg:px-0">
              <h1 className="mt-8 text-darkBlue text-3xl font-bold">
                {t("myProgressText")}
              </h1>
              <div className="lg:flex grid grid-cols-1">
                <div className="w-full">
                  <div className="my-14 h-[530px] lg:h-[350px] p-12 border-2 border-[#DEE2E6] rounded-md">
                    <h1 className="text-2xl mb-5">
                      {t("helloText")}, {user.Name} {user.Surname}
                    </h1>
                    <p className="mb-3 text-lg text-[#AFAFAF] lg:w-[690px] w-full">
                      {t("myProgressPageText1")}
                    </p>
                    <p className="mb-4 text-lg text-[#AFAFAF] lg:w-[650px] w-full">
                      {t("myProgressPageText2")}
                    </p>
                    <button className="bg-[#1ACD81] hover:bg-[#0fa968] text-[#fff] font-bold rounded-[30px] w-[250px] lg:w-[294px] h-[47px]  p-[10px]">
                      <Link to={"/longman/train"}>{t("startTrainText")}</Link>
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="flex justify-center">
                    <div className="w-full lg:w-[400px] h-[448px] p-7 text-center absolute lg:right-16 bg-[#fff] border-[4px] border-[#DEE2E6] rounded-md">
                      <h1 className="text-darkBlue text-2xl mb-4">
                        {t("hello2Text")}!
                      </h1>
                      <p className="text-[#A2A2A2] text-lg text-center mb-5">
                        {t("totalQuestions")}
                      </p>
                      <div className="flex justify-center">
                        <div>
                          <SemiCircleProgressBar
                            percentage={result?.resultPercentageDigit}
                            stroke={"#04AA6D"}
                            background={"#F7F7F7"}
                          />
                          <h1 className="mt-[-50px] mr-8 text-darkBlue text-3xl font-bold mb-[40px]">
                            {result?.resultPercentage}
                          </h1>
                          <div>
                            <p className="text-darkBlue text-center mb-5 w-[230px]">
                              {t("totalCorrectAnswers")} :
                              <span className="font-bold ml-1">
                                {result?.totalQuestions}
                              </span>
                            </p>
                            <p className="text-darkBlue text-center mb-5">
                              {t("yourProgressText")} :
                              <span className="font-bold ml-1">
                                {result?.totalCorrectAnswers}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProgressHistory />
          </div>
        </div>
      )}
      {!user && <NotLoggedUser />}
      {user && !user.trainingData && <ProgressNotAvailable />}
    </div>
  );
}
