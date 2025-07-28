import { themeColors } from "../data/themes";
import { useTheme } from "../components/ThemeContext";
import Header from "../components/Header";

const ContactMe = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex-col justify-start w-full h-screen ${themeColors[theme].bgColor}`}
    >
      <Header theme={theme} />
      <div className={`flex justify-center h-screen items-center `}>
        <h1 className={`text-center ${themeColors[theme].text}`}>Contact Me</h1>
      </div>
    </div>
  );
};

export default ContactMe;
