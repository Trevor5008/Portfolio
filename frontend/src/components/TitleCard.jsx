import { Link } from "react-router";
import { themeColors } from "../data/themes.js";
import { namePath } from "../data/namePath.js";
import { site } from "../data/site.js";

const TitleCard = ({ theme }) => {
  const palette = themeColors[theme];

  return (
    <div
      id="titleCard"
      className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-12 text-center sm:px-6"
    >
      <div
        className={`flex w-full flex-col items-center rounded-2xl px-4 py-8 sm:px-8 backdrop-blur-[2px] ${palette.heroScrim}`}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 250 1179 492"
          preserveAspectRatio="xMidYMid meet"
          className="h-auto w-[min(80vw,640px)]"
        >
          <g
            transform="translate(-200,500) scale(0.03,-0.1)"
            stroke={palette.svg}
            strokeWidth="28"
            fill="none"
          >
            <g transform="scale(4.5,1.7)">
              <path d={namePath.join(" ")} />
            </g>
          </g>
        </svg>

        <h1 className="sr-only">{site.name}</h1>

        <p
          className={`mt-2 text-lg font-semibold tracking-tight sm:text-xl ${palette.text}`}
        >
          {site.role}
        </p>

        <p
          className={`mt-3 max-w-xl text-sm leading-relaxed sm:text-base ${palette.bodyText}`}
        >
          {site.tagline}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/projects"
            className={`inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold ring-1 transition-colors duration-150 ${palette.ring} ${palette.text} ${palette.hover} ${palette.focusRing}`}
          >
            View projects
          </Link>

          {site.resumeUrl ? (
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-6 py-2.5 text-sm font-medium transition-colors duration-150 ${palette.border} ${palette.bodyText} ${palette.subtleHover} ${palette.focusRing}`}
            >
              Resume
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
