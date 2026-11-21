import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import CircuitBoard from "./CircuitBoard";
import TitleCard from "./TitleCard";
import { themeColors } from "../data/themes.js";
import { useTheme } from "./useTheme.js";

const CircuitHero = () => {
  const { theme } = useTheme();
  const [isComplete, setIsComplete] = useState(false);
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
    const validPolyPaths = polyPaths.current.filter(
      (p) => p && p.getTotalLength() > 0,
    );
    validPolyPaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    const t1 = gsap.timeline({
      onStart: () => setIsComplete(false),
      onComplete: () => setIsComplete(true),
      ease: "power2.inOut",
    });

    t1.add("circuits");
    t1.to(
      validPolyPaths,
      {
        strokeDashoffset: 0,
        duration: 3.5,
      },
      "circuits",
    );

    const validLinePaths = linePaths.current.filter(
      (p) => p && p.getTotalLength() > 0,
    );
    validLinePaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    t1.to(
      validLinePaths,
      {
        strokeDashoffset: 0,
        duration: 3.5,
      },
      "circuits",
    );

    return () => t1.kill();
  }, [theme]);

  return (
    <section
      aria-label="Introduction"
      className={`relative flex min-h-[520px] w-full items-center justify-center overflow-hidden border-b ${palette.border} md:min-h-[calc(100vh-4rem)]`}
    >
      <CircuitBoard
        registerPolyPath={registerPolyPath}
        registerLinePath={registerLinePath}
        pathColor={palette.stroke}
        setIsComplete={setIsComplete}
        isComplete={isComplete}
        theme={theme}
      />
      <TitleCard theme={theme} />
    </section>
  );
};

export default CircuitHero;
