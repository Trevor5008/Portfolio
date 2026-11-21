import { useParams } from "react-router";
import { themeColors } from "../data/themes";
import { useTheme } from "../components/useTheme";

const CaseStudy = () => {
  const { slug } = useParams();
  const { theme } = useTheme();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className={`text-3xl font-bold ${themeColors[theme].text}`}>
        {slug}
      </h1>
    </section>
  );
};

export default CaseStudy;
