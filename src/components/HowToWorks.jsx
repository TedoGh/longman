import { useTranslation } from "react-i18next";

const HowToWorks = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="py-[65px] animate__animated animate__fadeInDown">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-darkBlue text-2xl font-bold text-center font-case">
            {t("howToWorks")}
          </h1>
          <div className="my-16 grid grid-cols-3 justify-between max-[1024px]:grid-cols-2 gap-5 max-[768px]:grid-cols-1">
            <div className="max-w-[340px] mx-auto text-center border-solid border-2 border-[#D9EEE1] rounded-xl">
              <div className="m-7">
                <div className="flex justify-center">
                  <div className="w-[100px] h-[100px] rounded-[55px] bg-[#D9EEE1] flex justify-center items-center">
                    <img src="https://svgshare.com/i/11GH.svg" />
                  </div>
                </div>
                <h1 className="mt-6 mb-8 text-darkBlue  text-2xl font-bold">
                  {t("howToWorksCard1")}
                </h1>
                <p className="text-lg">{t("howToWorksCard1Desc")}</p>
              </div>
            </div>
            <div className="max-w-[340px] mx-auto text-center border-solid border-2 border-[#D9EEE1] rounded-xl">
              <div className="m-7">
                <div className="flex justify-center">
                  <div className="w-[100px] h-[100px] rounded-[55px] bg-[#D9EEE1] flex justify-center items-center">
                    <img src="https://svgshare.com/i/11GZ.svg" />
                  </div>
                </div>
                <h1 className="mt-6 mb-8 text-darkBlue text-2xl font-bold">
                  {t("howToWorksCard2")}
                </h1>
                <p className="text-lg">{t("howToWorksCard2Desc")}</p>
              </div>
            </div>
            <div className="max-w-[340px] mx-auto text-center border-solid border-2 border-[#D9EEE1] rounded-xl">
              <div className="m-7">
                <div className="flex justify-center">
                  <div className="w-[100px] h-[100px] rounded-[55px] bg-[#D9EEE1] flex justify-center items-center">
                    <img src="https://svgshare.com/i/11HM.svg" />
                  </div>
                </div>
                <h1 className="mt-6 mb-8 text-darkBlue text-2xl font-bold">
                  {t("howToWorksCard3")}
                </h1>
                <p className="text-lg">{t("howToWorksCard3Desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToWorks;
