import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

vi.mock("gsap", () => ({
  gsap: {
    timeline: ({ onStart, onComplete } = {}) => {
      onStart?.();
      onComplete?.();
      return {
        add: vi.fn().mockReturnThis(),
        to: vi.fn().mockReturnThis(),
        kill: vi.fn(),
      };
    },
  },
}));

if (typeof window !== "undefined") {
  window.scrollTo = vi.fn();

  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  }

  if (typeof SVGElement !== "undefined") {
    SVGElement.prototype.getTotalLength = vi.fn(() => 100);
  }
}

afterEach(() => {
  cleanup();
});
