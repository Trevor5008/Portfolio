import { themeColors } from "../data/themes";
import { useTheme } from "./ThemeContext";

const Test = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex justify-center items-center w-full h-screen ${themeColors[theme].bgColor}`}
    >
      <h1 className={`text-center ${themeColors[theme].text}`}>Test</h1>
    </div>
  );
};

export default Test;
