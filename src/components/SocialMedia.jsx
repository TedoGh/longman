import { FaLinkedin } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SocialMedia() {
  return (
    <>
      <Link to={"https://linkedin.com"}>
        <FaLinkedin color="#A1A1A1" size={20} />
      </Link>
      <Link to={"https://reddit.com"}>
        <FaReddit color="#A1A1A1" size={20} />
      </Link>
      <Link to={"https://facebook.com"}>
        <FaFacebook color="#A1A1A1" size={20} />
      </Link>
      <Link to={"https://github.com"}>
        <FaGithub color="#A1A1A1" size={20} />
      </Link>
    </>
  );
}
