import { Link } from "react-router";
import { site } from "../data/site";
import { themeColors } from "../data/themes";
import { useTheme } from "../components/useTheme";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const NotFound = () => {
  const { theme } = useTheme();
  const palette = themeColors[theme];

  useDocumentTitle(`Page Not Found | ${site.name}`, { canonical: false });

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-4 px-4 py-16 sm:px-6">
      <h1 className={`text-3xl font-bold ${palette.text}`}>Page not found</h1>
      <p className={palette.mutedText}>
        The page you requested does not exist or may have moved.
      </p>
      <Link
        to="/"
        className={`inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-medium ring-1 ${palette.ring} ${palette.text} ${palette.hover} ${palette.focusRing} transition-colors duration-150`}
      >
        Return home
      </Link>
    </section>
  );
};

export default NotFound;
