import ThemeSwitch from "./ThemeSwitch";
import { themeColors } from "../data/themes";

const Header = ({ theme }) => {
  return (
    <div
      className={`flex justify-center items-center ring-1 ${themeColors[theme].ring} h-1/10 w-screen`}
    >
      <h1 className={`text-center ${themeColors[theme].text}`}>Header</h1>
      <ThemeSwitch />
    </div>
  );
};

export default Header;
