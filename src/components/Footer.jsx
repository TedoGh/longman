import { useTranslation } from "react-i18next";
import Logo from "../components/Logo";
import SocialMedia from "./SocialMedia";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import FooterData from "../data/FooterData";

export default function Footer() {
  const { t } = useTranslation();
  const Year = new Date().getFullYear();
  const location = useLocation();
  const [showMobile, setShowMobile] = useState(false);

  const handleShowFooter = (id) => {
    setShowMobile((prevId) => (prevId === id ? true : id));
  };

  useEffect(() => {
    setShowMobile(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <footer className="border-t border-footerBorder">
      <div className="max-w-[1200px] mx-auto">
        <div className="hidden lg:block">
          <div className="flex justify-between items-center">
            <div className="my-6">
              <Logo />
              <p className="max-w-[314px] mx-auto text-lg text-[#8C8C8C] mt-5 mb-6">
                {t("footerDesc")}
              </p>
              <div className="flex gap-4">
                <SocialMedia />
              </div>
            </div>
            <div className="flex gap-24 mt-8">
              {FooterData().map((item) => {
                return (
                  <div key={item.id}>
                    <div>
                      <h1 className="text-lg mb-4 text-[#282A35] font-bold">
                        {item.title}
                      </h1>
                      {item.lists.map((listItem, index) => (
                        <ul key={index}>
                          <li className="flex flex-col text-[#8C8C8C]">
                            <Link to={listItem.path} className="mb-3">
                              {listItem.menuTitle}
                            </Link>
                          </li>
                        </ul>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="p-4 lg:hidden">
          {FooterData().map((item) => {
            return (
              <div className="mb-7" key={item.id}>
                <div
                  className="flex justify-between"
                  onClick={() => handleShowFooter(item.id)}
                >
                  <h1 className="font-bold">{item.title}</h1>
                  {showMobile === item.id ? (
                    <FaAngleUp color="#8C8C8C" size={18} />
                  ) : (
                    <FaAngleDown color="#8C8C8C" size={18} />
                  )}
                </div>
                {showMobile === item.id ? (
                  <div
                    className={
                      showMobile === item.id
                        ? "mt-4 block animate__animated animate__fadeInDown"
                        : null
                    }
                  >
                    <ul>
                      {item.lists.map((listItem) => (
                        <li className="text-[#8C8C8C] mb-3" key={listItem.id}>
                          <Link
                            to={listItem.path}
                            className={
                              location.pathname === listItem.path
                                ? "text-green"
                                : ""
                            }
                          >
                            {listItem.menuTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            );
          })}
          <div className="flex gap-4">
            <SocialMedia />
          </div>
        </div>
      </div>
      <div className="text-sm text-footerText border-t border-footerBorder py-7 flex justify-center items-center font-case">
        <span>
          © {Year} {t("footerRights")}
        </span>
      </div>
    </footer>
  );
}
