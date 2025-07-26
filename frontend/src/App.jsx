import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import CircuitBoard from "./components/CircuitBoard";
import TitleCard from "./components/TitleCard";
import { themeColors } from "./data/themes.js";
import { useTheme } from "./components/ThemeContext.jsx";

function App() {
  const { theme } = useTheme();
  const [isComplete, setIsComplete] = useState(false);

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
  }, [theme]);

  return (
    <div className={themeColors[theme].bgColor}>
      <CircuitBoard
        registerPolyPath={registerPolyPath}
        registerLinePath={registerLinePath}
        pathColor={themeColors[theme].stroke}
        setIsComplete={setIsComplete}
        isComplete={isComplete}
        theme={theme}
      />
      <TitleCard isComplete={isComplete} theme={theme} />
    </div>
  );
}

export default App;
