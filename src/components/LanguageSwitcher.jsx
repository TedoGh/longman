import i18next from "i18next";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [currentLanguageCode, setCurrentLanguageCode] = useState(
    Cookies.get("i18next") || "ka"
  );

  const updateLanguage = (newLanguageCode) => {
    i18next.changeLanguage(newLanguageCode);
    setCurrentLanguageCode(newLanguageCode);
    Cookies.set("i18next", newLanguageCode);
  };

  const toggleLanguage = () => {
    const newLanguageCode = currentLanguageCode === "ka" ? "en" : "ka";
    updateLanguage(newLanguageCode);
  };

  useEffect(() => {
    document.body.setAttribute("lang", currentLanguageCode);
  }, [currentLanguageCode]);

  return (
    <>
      <button onClick={toggleLanguage} className="text-green">
        {currentLanguageCode === "ka" ? "ENG" : "GEO"}
      </button>
    </>
  );
}
