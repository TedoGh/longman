import { useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="max-w-[1200px] mx-auto">
        <div className="px-5 py-4 lg:px-0">
          <h1 className="text-2xl font-bold">{t("faqPage")}</h1>
          <div className="mt-16">
            <div className="px-8 py-9 border-solid border-2 border-[#F8F8F8] rounded-xl mb-7">
              <h2 className="text-darkBlue text-2xl font-bold mb-5">
                {t("faqSectionTitle")}
              </h2>
              <p>{t("faqText")}</p>
            </div>
            <div className="px-8 py-9 border-solid border-2 border-[#F8F8F8] rounded-xl mb-7">
              <h2 className="text-darkBlue text-2xl font-bold mb-5">
                {t("faqSectionTitle")}
              </h2>
              <p>{t("faqText")}</p>
            </div>
            <div className="px-8 py-9 border-solid border-2 border-[#F8F8F8] rounded-xl mb-7">
              <h2 className="text-darkBlue text-2xl font-bold mb-5">
                {t("faqSectionTitle")}
              </h2>
              <p>{t("faqText")}</p>
            </div>
            <div className="px-8 py-9 border-solid border-2 border-[#F8F8F8] rounded-xl mb-7">
              <h2 className="text-darkBlue text-2xl font-bold mb-5">
                {t("faqSectionTitle")}
              </h2>
              <p>{t("faqText")}</p>
            </div>
            <div className="px-8 py-9 border-solid border-2 border-[#F8F8F8] rounded-xl mb-7">
              <h2 className="text-darkBlue text-2xl font-bold mb-5">
                {t("faqSectionTitle")}
              </h2>
              <p>{t("faqText")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
