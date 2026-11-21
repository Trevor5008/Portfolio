import { createContext, useContext } from "react";

export const ThemeContext = createContext(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used w/in ThemeProvider");
  return ctx;
};
