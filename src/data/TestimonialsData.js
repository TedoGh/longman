import { useTranslation } from "react-i18next";

const TestimonialsData = () => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      userImg:
        "https://bootstrapmade.com/demo/templates/Arsha/assets/img/team/team-2.jpg",
      UserName: "Nino K.",
      UserRate: `${t("testimonialsUserRate1")}`,
    },
    {
      id: 2,
      userImg:
        "https://bootstrapmade.com/demo/templates/Arsha/assets/img/team/team-1.jpg",
      UserName: "Giorgi M.",
      UserRate: `${t("testimonialsUserRate2")}`,
    },
    {
      id: 3,
      userImg:
        "https://bootstrapmade.com/demo/templates/Arsha/assets/img/team/team-3.jpg",
      UserName: "Shota B.",
      UserRate: `${t("testimonialsUserRate3")}`,
    },
    {
      id: 4,
      userImg:
        "https://bootstrapmade.com/demo/templates/Arsha/assets/img/team/team-4.jpg",
      UserName: "Tinatin B.",
      UserRate: `${t("testimonialsUserRate4")}`,
    },
    {
      id: 5,
      userImg: "https://i.imgur.com/w2CKRB9.jpeg",
      UserName: "Levan G.",
      UserRate: `${t("testimonialsUserRate5")}`,
    },
  ];
};

export default TestimonialsData;
