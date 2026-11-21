import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import ContactMe from "./pages/ContactMe.jsx";
import Blog from "./pages/Blog.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="home" element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<ContactMe />} />
          <Route path="blog" element={<Blog />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
