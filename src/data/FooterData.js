import { useTranslation } from "react-i18next";

const FooterData = () => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      title: `${t("mainSection")}`,
      lists: [
        {
          id: 1,
          path: "/longman",
          menuTitle: `${t("homePage")}`,
        },
        {
          id: 2,
          path: "/longman/cards",
          menuTitle: `${t("allCardPage")}`,
        },
        {
          id: 3,
          path: "/longman/train",
          menuTitle: `${t("trainPage")}`,
        },
        {
          id: 4,
          path: "/longman/progress",
          menuTitle: `${t("progressPage")}`,
        },
      ],
    },
    {
      id: 2,
      title: `${t("aboutSection")}`,
      lists: [
        {
          id: 5,
          path: "/longman/about",
          menuTitle: `${t("aboutPage")}`,
        },
        {
          id: 6,
          path: "/longman/#",
          menuTitle: `${t("aboutProjectPage")}`,
        },
        {
          id: 7,
          path: "/longman/#",
          menuTitle: `${t("blogPage")}`,
        },
      ],
    },
    {
      id: 3,
      title: `${t("additionallySection")}`,
      lists: [
        {
          id: 8,
          path: "/longman/terms-and-conditions",
          menuTitle: `${t("termsAndConditionsPage")}`,
        },
        {
          id: 9,
          path: "/longman/#",
          menuTitle: `${t("forumPage")}`,
        },
        {
          id: 10,
          path: "/longman/#",
          menuTitle: `${t("contactPage")}`,
        },
        {
          id: 11,
          path: "/longman/faq",
          menuTitle: `${t("faqPage")}`,
        },
      ],
    },
  ];
};

export default FooterData;
