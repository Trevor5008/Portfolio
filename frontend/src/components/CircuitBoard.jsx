import Circle from "./Circle";
import AnimatedPath from "./AnimatedPath";
import ThemeSwitch from "./ThemeSwitch";
import polyLines from "../data/polyLines.js";
import circles from "../data/circles.js";
import linePaths from "../data/linePaths.js";

const CircuitBoard = ({
  registerPolyPath,
  registerLinePath,
  setIsComplete,
  pathColor,
  isComplete,
  theme,
}) => {
  // Converts polyline coords to path 'd' property format
  function polylineToPath(pointsStr) {
    const points = pointsStr.trim().split(" ");
    return `M ${points.join(" ")}`;
  }

  return (
    <div id="main-content">
      <ThemeSwitch position="absolute" />
      <svg
        className="w-full h-screen"
        viewBox="0 0 960 560"
        preserveAspectRatio="none"
      >
        <g id="lines">
          {polyLines.map((node, key) => {
            return (
              <AnimatedPath
                register={registerPolyPath}
                pathColor={pathColor}
                theme={theme}
                setIsComplete={setIsComplete}
                idx={key}
                key={key}
                d={polylineToPath(node.points)}
              />
            );
          })}
          {linePaths.map((node, key) => {
            return (
              <AnimatedPath
                register={registerLinePath}
                pathColor={pathColor}
                theme={theme}
                setIsComplete={setIsComplete}
                idx={key}
                key={key}
                d={node}
              />
            );
          })}
        </g>
        <g id="circles">
          {circles.map((node, key) => {
            return (
              <Circle
                isComplete={isComplete}
                theme={theme}
                key={key}
                cx={node.cx}
                cy={node.cy}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default CircuitBoard;
