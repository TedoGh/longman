import React from "react";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="max-w-[1200px] mx-auto">
        <div className="px-5 py-4 lg:px-0">
          <h1 className="text-2xl font-bold"> {t("termsAndConditionsText")}</h1>
          <div className="mt-14">
            <div className="px-8 py-5">
              <h2 className="text-darkBlue text-2xl font-bold mb-5">
                {t("termsOfService")}
              </h2>
              <div className="mb-5">
                <h3 className="text-darkBlue text-xl font-bold mb-5">
                  {t("acceptanceOfTerms")}
                </h3>
                <p>{t("acceptanceOfTermsText")}</p>
              </div>
              <div className="mb-5">
                <h3 className="text-darkBlue text-xl font-bold mb-5">
                  {t("useOfTheService")}
                </h3>
                <p>{t("useOfTheServiceText")}</p>
              </div>
              <div className="mb-5">
                <h3 className="text-darkBlue text-xl font-bold mb-5">
                  {t("userAccounts")}
                </h3>
                <p>{t("userAccountsText")}</p>
              </div>
              <div className="mb-5">
                <h3 className="text-darkBlue text-xl font-bold mb-5">
                  {t("ownerShipContent")}
                </h3>
                <p>{t("ownerShipContentText")}</p>
              </div>
            </div>
            <div className="px-8 py-5">
              <h2 className="text-darkBlue text-2xl font-bold mb-5">
                {t("privacyPolicy")}
              </h2>
              <div className="mb-5">
                <h3 className="text-darkBlue text-xl font-bold mb-5">
                  {t("informationWeCollect")}
                </h3>
                <p>{t("informationWeCollectText")}</p>
              </div>
              <div className="mb-5">
                <h3 className="text-darkBlue text-xl font-bold mb-5">
                  {t("howWeUseyourinformation")}
                </h3>
                <p>{t("howWeUseyourinformationText")}</p>
              </div>
              <div className="mb-5">
                <h3 className="text-darkBlue text-xl font-bold mb-5">
                  {t("dataSecurity")}
                </h3>
                <p>{t("dataSecurityText")}</p>
              </div>
              <div className="mb-5">
                <h3 className="text-darkBlue text-xl font-bold mb-5">
                  {t("thirdPartyServices")}
                </h3>
                <p>{t("thirdPartyServicesText")}</p>
              </div>
              <div className="mb-5">
                <h3 className="text-darkBlue text-xl font-bold mb-5">
                  {t("changesToThePrivacyPolicy")}
                </h3>
                <p>{t("changesToThePrivacyPolicyText")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
