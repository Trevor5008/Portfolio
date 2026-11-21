import { useState, useEffect } from "react";
import { ThemeContext } from "./useTheme";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};
