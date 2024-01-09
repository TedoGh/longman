import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  const { t } = useTranslation();
  return (
    <div className="my-7">
      <div className="flex items-center flex-col">
        <div className="bg-center bg-no-repeat bg-auto bg-[url('https://svgshare.com/i/11TG.svg')] w-[360px] md:w-[768px] lg:w-[1080px] lg:h-[500px] flex justify-center items-center">
          <h1 className="text-[#fff] text-[170px]  font-bold mt-11">404</h1>
        </div>
        <div className="my-9 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-darkBlue mb-8">
            {t("pageNotFoundText")}
          </h1>
          <p className="max-w-[450px] mb-14 px-4">{t("pageNotFoundDesc")}</p>
          <button className="bg-[#04AA6D] text-[#fff] font-bold rounded-[30px] w-[294px] h-[47px]  p-[10px] gap-[10px]">
            <Link to={"/longman"}> {t("pageNotFoundHomePage")}</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
