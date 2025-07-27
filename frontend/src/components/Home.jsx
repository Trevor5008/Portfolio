import { themeColors } from "../data/themes";
import { useTheme } from "./ThemeContext";
import Header from "./Header";

const Home = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex-col justify-start w-full h-screen ${themeColors[theme].bgColor}`}
    >
      <Header theme={theme} />
      <div className={`flex justify-center h-screen items-center `}>
        <h1 className={`text-center ${themeColors[theme].text}`}>Test</h1>
      </div>
    </div>
  );
};

export default Home;
