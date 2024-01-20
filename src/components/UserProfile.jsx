import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuthorizationContext } from "../pages/Context/AuthorizationContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [showExit, setShowExit] = useState(false);
  const userProfileRef = useRef(null);
  const { user, setUser } = useAuthorizationContext();

  const { t } = useTranslation();

  const handleShowExit = () => {
    setShowExit((prevState) => !prevState);
  };
  const handleClickOutside = (e) => {
    if (userProfileRef.current && !userProfileRef.current.contains(e.target)) {
      setShowExit(false);
    }
  };

  useEffect(() => {
    if (showExit) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "visible";
    };
  }, [showExit]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="w-[60px] h-[60px] flex justify-center items-center  border-solid border-4 border-[#D9EEE1] rounded-[50%]">
          <Link to={"/longman/progress"}>
            <FaUserCircle size={30} color={"#0AAA8A"} />
          </Link>
        </div>
        <div>
          <FaAngleDown
            size={18}
            onClick={handleShowExit}
            className="cursor-pointer"
          />
        </div>
        {showExit && (
          <div
            className="relative"
            onClick={handleShowExit}
            ref={userProfileRef}
          >
            <div
              className={
                showExit &&
                "text-[#E10000] bg-[#fff] border-solid border-2 border-[#f9f9f9] rounded-md p-4 absolute top-14 right-0 cursor-pointer animate__animated animate__fadeInDown"
              }
            >
              <div
                className="flex items-center gap-2"
                onClick={() => setUser()}
              >
                <FaSignOutAlt />
                <span>{t("logOut")}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
