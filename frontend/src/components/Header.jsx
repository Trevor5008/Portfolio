import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "./useTheme";
import { themeColors } from "../data/themes";
import { namePath } from "../data/namePath";
import { site } from "../data/site";

const navItems = [
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const palette = themeColors[theme];

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const getNavLinkClasses = ({ isActive }) =>
    [
      "inline-flex min-h-11 items-center px-3 text-sm font-medium transition-colors duration-150",
      palette.focusRing,
      isActive
        ? `${palette.text} border-b-2 ${palette.accentBorder} font-semibold`
        : `${palette.bodyText} ${palette.hoverText} border-b-2 border-transparent`,
    ].join(" ");

  return (
    <header className={`w-full border-b ${palette.border} ${palette.bgColor}`}>
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6"
      >
        <Link
          to="/"
          aria-label={`${site.name}, home`}
          className={`inline-flex min-h-11 items-center rounded-md px-1 ${palette.focusRing}`}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 250 1179 492"
            preserveAspectRatio="xMidYMid meet"
            className="h-9 w-auto max-w-[160px]"
          >
            <g
              transform="translate(-200,500) scale(0.03,-0.1)"
              stroke={palette.svg}
              strokeWidth="32"
              fill="none"
            >
              <g transform="scale(4.5,1.7)">
                <path d={namePath.join(" ")} />
              </g>
            </g>
          </svg>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={getNavLinkClasses}>
              {item.label}
            </NavLink>
          ))}
          <ThemeSwitch />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitch />
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-primary-menu"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg ring-1 ${palette.ring} ${palette.text} ${palette.subtleHover} ${palette.focusRing} transition-colors duration-150`}
          >
            {menuOpen ? (
              <svg
                aria-hidden="true"
                focusable="false"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                focusable="false"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-primary-menu"
          className={`border-t ${palette.border} px-4 py-3 md:hidden`}
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      "flex min-h-11 w-full items-center rounded-md px-3 text-base font-medium transition-colors duration-150",
                      palette.focusRing,
                      isActive
                        ? `${palette.text} ${palette.surface} border-l-2 ${palette.accentBorder} font-semibold`
                        : `${palette.bodyText} ${palette.subtleHover}`,
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
