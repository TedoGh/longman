import i18next from "i18next";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [currentLanguageCode, setCurrentLanguageCode] = useState(
    Cookies.get("i18next") || "ka"
  );

  const toggleLanguage = () => {
    const changeLanguageCode = currentLanguageCode === "ka" ? "en" : "ka";
    i18next.changeLanguage(changeLanguageCode);
    setCurrentLanguageCode(changeLanguageCode);
  };

  useEffect(() => {
    document.body.setAttribute("lang", currentLanguageCode);
  }, [currentLanguageCode]);

  return (
    <div>
      <button style={{paddingTop:'10px'}} onClick={toggleLanguage} className="text-green">
        {currentLanguageCode === "ka" ? "ENG" : "GEO"}
      </button>
    </div>
  );
}
