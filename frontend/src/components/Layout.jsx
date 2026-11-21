import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "./useTheme";
import { themeColors } from "../data/themes";

const Layout = () => {
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const palette = themeColors[theme];

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans ${palette.bgColor} ${palette.bodyText}`}
    >
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
