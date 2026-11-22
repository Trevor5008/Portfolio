import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import CircuitBoard from "./CircuitBoard";
import TitleCard from "./TitleCard";
import { themeColors } from "../data/themes.js";
import { useTheme } from "./useTheme.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import {
  hasPlayedCircuitIntro,
  markCircuitIntroPlayed,
} from "./introState.js";

const CircuitHero = () => {
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [isComplete, setIsComplete] = useState(
    () => reducedMotion || hasPlayedCircuitIntro(),
  );
  const palette = themeColors[theme];

  const polyPaths = useRef([]);
  const linePaths = useRef([]);

  const registerLinePath = (el, idx) => {
    if (el) {
      linePaths.current[idx] = el;
    }
  };

  const registerPolyPath = (el, idx) => {
    if (el) {
      polyPaths.current[idx] = el;
    }
  };

  useLayoutEffect(() => {
    const allPaths = [...polyPaths.current, ...linePaths.current].filter(
      (p) =>
        p && typeof p.getTotalLength === "function" && p.getTotalLength() > 0,
    );

    if (reducedMotion || hasPlayedCircuitIntro()) {
      allPaths.forEach((path) => {
        path.style.strokeDasharray = "";
        path.style.strokeDashoffset = "0";
      });
      setIsComplete(true);
      markCircuitIntroPlayed();
      return undefined;
    }

    // Mark played as soon as the intro begins so navigating away mid-animation
    // cannot trigger a replay when returning Home.
    markCircuitIntroPlayed();

    allPaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    const t1 = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
      },
      ease: "power2.inOut",
    });

    t1.to(allPaths, {
      strokeDashoffset: 0,
      duration: 3.5,
    });

    return () => {
      markCircuitIntroPlayed();
      t1.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      aria-label="Introduction"
      className={`relative flex min-h-[500px] w-full items-center justify-center overflow-hidden border-b ${palette.border} md:min-h-[calc(100vh-4rem)]`}
    >
      <CircuitBoard
        registerPolyPath={registerPolyPath}
        registerLinePath={registerLinePath}
        pathColor={palette.stroke}
        isComplete={isComplete}
        theme={theme}
      />
      <TitleCard theme={theme} />
    </section>
  );
};

export default CircuitHero;
