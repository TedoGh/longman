import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import AuthorizationBtns from "./AuthorizationBtns";
import { useEffect, useState, useRef } from "react";
import Burger from "../assets/images/burger.svg";
import { FaAngleRight } from "react-icons/fa";
import HeaderData from "../data/HeaderData";
import UserProfile from "./UserProfile";
import { useAuthorizationContext } from "../Context/AuthorizationContext";

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const { user } = useAuthorizationContext();

  const HeaderRouterData = HeaderData();

  const toggleMenu = () => {
    setShowMenu(true);
  };

  useEffect(() => {
    setShowMenu(false);
  }, [location, t]);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "visible";
    };
  }, [showMenu]);

  return (
    <header className="p-5 sticky top-0 z-[999] bg-[#fafafa] border-[#e4e4e4] border-b">
      <div className="max-w-[1200px] mx-auto">
        <div className="lg:flex-row flex justify-between items-center flex-row-reverse">
          <Logo />
          <div className="hidden lg:flex">
            {/* desktop menu */}
            <ul className="flex gap-5 items-center max-[1024px]:hidden">
              {HeaderRouterData.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`${item.path}`}
                    className={
                      location.pathname === `${item.path}` ? "text-green" : ""
                    }
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-8 items-center">
            <div className="max-[1024px]:hidden">
              <LanguageSwitcher />
            </div>
            {!user && (
              <div>
                <AuthorizationBtns />
              </div>
            )}
            {user && <UserProfile />}
          </div>
          <div>
            {/* Hamburger */}
            <div
              className="lg:hidden block cursor-pointer"
              onClick={toggleMenu}
            >
              {showMenu ? "" : <img src={Burger} alt="Burger Icon" />}
            </div>
            {/* Mobile Menu */}
            {showMenu && (
              <div
                ref={menuRef}
                className="flex absolute flex-col w-3/4 h-screen top-0 right-full left-0 pl-7 justify-center bg-[#fff] gap-3 z-10 lg:hidden animate__animated animate__bounceInLeft"
              >
                <ul>
                  {HeaderRouterData.map((item) => (
                    <li
                      className="py-4 flex justify-between pr-8"
                      key={item.id}
                    >
                      <Link
                        to={`${item.path}`}
                        className={
                          location.pathname === `${item.path}`
                            ? "text-green"
                            : ""
                        }
                      >
                        {item.name}
                      </Link>
                      <FaAngleRight color="#A5A5A5" size={16} />
                    </li>
                  ))}
                </ul>
                <div>
                  <LanguageSwitcher />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
