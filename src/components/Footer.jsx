import { useTranslation } from "react-i18next";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
export default function Footer() {
  const { t } = useTranslation();
  const Year = new Date().getFullYear();

  const footerData = [
    {
      title: "მთავარი",
      lists: ["მთავარი", "ყველა ქარდი", "ვარჯიში", "პროგრესი"],
    },
    {
      title: "ჩვენ შესახებ",
      lists: ["ჩვენს შესახებ", "პროექტის შესახებ", "ბლოგი"],
    },
    {
      title: "დამატებით",
      lists: ["წესები და პირობები", "ფორუმი", "კონტაქტი", "FAQ"],
    },
  ];

  return (
    <footer className="border-t border-footerBorder">
      <div className="max-w-[1200px] mx-auto">
        <div className="hidden lg:block">
          <div className="flex justify-between items-center">
            <div className="my-6">
              <Logo />
              <p className="max-w-[314px] mx-auto text-lg text-[#8C8C8C] mt-5 mb-6">
                FlashCard: პერსონალიზებული სწავლა და გლობალური საზოგადოება.
                აიმაღლეთ თქვენი ენის ცოდნა ძალისხმევის გარეშე. შექმენით
                პერსონალური ფლეშ ბარათები.
              </p>
              <div className="flex gap-4">
                <span>linkedin</span>
                <span>reddit</span>
                <span>facebook</span>
                <span>github</span>
              </div>
            </div>
            <div className="flex gap-24 mt-8">
              {footerData.map((item) => {
                return (
                  <div key={item.title}>
                    <div>
                      <h1 className="text-lg mb-4 text-[#282A35] font-bold">
                        {item.title}
                      </h1>
                      {item.lists.map((listItem, index) => (
                        <ul key={index}>
                          <li className="flex flex-col text-[#8C8C8C]">
                            <Link to={"/"} className="mb-3">
                              {listItem}
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
      </div>
      <div className="text-sm text-footerText border-t border-footerBorder py-7 flex justify-center items-center helveticaBold font-case">
        <span>
          © {Year} {t("footerRights")}
        </span>
      </div>
    </footer>
  );
}
