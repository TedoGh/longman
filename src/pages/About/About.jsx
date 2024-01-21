import AboutImg from "../assets/images/about-page.png";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl text-darkBlue font-bold my-6 px-4 lg:px-0">
          {t("aboutText")}
        </h1>
      </div>
      <div>
        <img className="w-full" src={AboutImg} />
      </div>
      <div className="max-w-[1200px] mx-auto">
        <div className="my-12">
          <div className="mb-8">
            <div className="px-8">
              <h1 className="text-2xl text-darkBlue font-bold mb-10">
                {t("historyOurSite")}
              </h1>
              <p className="mb-5">{t("historyOurSitePart1")}</p>
              <p className="mb-5">{t("historyOurSitePart2")}</p>
              <p className="mb-5">{t("historyOurSitePart3")}</p>
              <p className="mb-5">{t("historyOurSitePart4")}</p>
              <p className="mb-5">{t("historyOurSitePart5")}</p>
            </div>
          </div>
          <div className="mb-8">
            <div className="px-8">
              <h1 className="text-2xl text-darkBlue font-bold mb-10">
                {t("purposeOurSite")}
              </h1>
              <p className="mb-5">{t("purposeOurSitePart1")}</p>
              <p className="mb-5">{t("purposeOurSitePart2")}</p>
              <p className="mb-5">{t("purposeOurSitePart3")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
