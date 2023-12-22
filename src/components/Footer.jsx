import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const Year = new Date().getFullYear();

  return (
    <footer>
      <div className="text-sm text-footerText border-t border-footerBorder py-7 flex justify-center items-center helveticaBold font-case">
        <span>
          © {Year} {t("footerRights")}
        </span>
      </div>
    </footer>
  );
}
