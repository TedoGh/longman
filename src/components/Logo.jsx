import { Link } from "react-router-dom";
import LogoSVG from "../assets/images/Logo.svg";

export default function Logo() {
  return (
    <Link to="/longman/">
      <img src={LogoSVG} alt="LOGO" />
    </Link>
  );
}
