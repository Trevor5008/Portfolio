import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
