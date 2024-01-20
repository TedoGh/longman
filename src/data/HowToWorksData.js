import { useTranslation } from "react-i18next";

const HowToWorksData = () => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      imgUrl: "https://svgshare.com/i/11GH.svg",
      title: `${t("howToWorksCard1")}`,
      description: `${t("howToWorksCard1Desc")}`,
    },
    {
      id: 2,
      imgUrl: "https://svgshare.com/i/11GZ.svg",
      title: `${t("howToWorksCard2")}`,
      description: `${t("howToWorksCard2Desc")}`,
    },
    {
      id: 3,
      imgUrl: "https://svgshare.com/i/11HM.svg",
      title: `${t("howToWorksCard3")}`,
      description: `${t("howToWorksCard3Desc")}`,
    },
  ];
};

export default HowToWorksData;
