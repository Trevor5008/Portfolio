import { useEffect } from "react";
import { useLocation } from "react-router";
import { site } from "../data/site";

export const useDocumentTitle = (title, { canonical = true } = {}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const baseUrl = site.url?.replace(/\/$/, "");
    if (!baseUrl) return;

    const canonicalHref =
      pathname === "/" ? `${baseUrl}/` : `${baseUrl}${pathname}`;

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", canonicalHref);
    } else if (canonicalEl) {
      canonicalEl.remove();
    }

    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl && canonical) {
      ogUrlEl.setAttribute("content", canonicalHref);
    }
  }, [title, pathname, canonical]);
};
