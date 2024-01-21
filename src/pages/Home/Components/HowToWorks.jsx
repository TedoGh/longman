import { useTranslation } from "react-i18next";
import HowToWorksData from "../../../data/HowToWorksData";

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
            {HowToWorksData().map((item) => {
              return (
                <div
                  className="max-w-[340px] mx-auto text-center border-solid border-2 border-[#D9EEE1] rounded-xl"
                  key={item.id}
                >
                  <div className="m-7">
                    <div className="flex justify-center">
                      <div className="w-[100px] h-[100px] rounded-[55px] bg-[#D9EEE1] flex justify-center items-center">
                        <img src={item.imgUrl} />
                      </div>
                    </div>
                    <h1 className="mt-6 mb-8 text-darkBlue  text-2xl font-bold">
                      {item.title}
                    </h1>
                    <p className="text-lg">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToWorks;
