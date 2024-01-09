import { useTranslation } from "react-i18next";

const HeaderData = () => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      name: `${t("homeText")}`,
      path: "/longman",
    },
    {
      id: 2,
      name: `${t("aboutText")}`,
      path: "/longman/about",
    },
    {
      id: 3,
      name: `${t("addCardText")}`,
      path: "/longman/addcard",
    },
    {
      id: 4,
      name: `${t("allCardsText")}`,
      path: "/longman/cards",
    },
    {
      id: 5,
      name: `${t("trainText")}`,
      path: "/longman/train",
    },
    {
      id: 6,
      name: `${t("myProgressText")}`,
      path: "/longman/progress",
    },
  ];
};

export default HeaderData;
