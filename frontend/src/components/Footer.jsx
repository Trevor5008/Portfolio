import { useTheme } from "./useTheme";
import { themeColors } from "../data/themes";
import { site } from "../data/site";

const Footer = () => {
  const { theme } = useTheme();
  const palette = themeColors[theme];
  const currentYear = new Date().getFullYear();

  const linkClasses = `inline-flex min-h-11 items-center px-2 text-sm ${palette.mutedText} ${palette.hoverText} ${palette.focusRing} rounded-md transition-colors duration-150`;

  return (
    <footer className={`w-full border-t ${palette.border} ${palette.bgColor}`}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
        <p className={`text-sm ${palette.mutedText}`}>
          &copy; {currentYear} {site.name}
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-4">
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className={linkClasses}>
              Email
            </a>
          </li>
          {site.resumeUrl ? (
            <li>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                Resume
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
