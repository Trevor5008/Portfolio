import ThemeSwitch from "./ThemeSwitch";
import { themeColors } from "../data/themes";
import { Link } from "react-router";

const Header = ({ theme }) => {
  return (
    <div
      className={`flex font-rock-salt justify-between items-center ring-1 ${themeColors[theme].ring} h-1/10 w-screen`}
    >
      <button className={`${themeColors[theme].text} text-sm ml-[5vw]`}>
        <Link to="/">Back</Link>
      </button>
      <div className="flex justify-center items-center gap-10 mr-[5vw]">
        <button className={`${themeColors[theme].text} text-md`}>
          <Link to="/projects">Projects</Link>
        </button>
        <button className={`${themeColors[theme].text} text-md`}>
          <Link to="/blog">Blog</Link>
        </button>
        <button className={`${themeColors[theme].text} text-md`}>
          <Link to="/contact">Contact Me</Link>
        </button>
        <ThemeSwitch position={""} />
      </div>
    </div>
  );
};

export default Header;
