import Circle from "./Circle";
import AnimatedPath from "./AnimatedPath.jsx";
import polyLines from "../data/polyLines.js";
import circles from "../data/circles.js";
import linePaths from "../data/linePaths.js";

const CircuitBoard = ({
  registerPolyPath,
  registerLinePath,
  pathColor,
  isComplete,
  theme,
}) => {
  function polylineToPath(pointsStr) {
    const points = pointsStr.trim().split(" ");
    return `M ${points.join(" ")}`;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        className="h-full w-full"
        viewBox="0 0 960 560"
        preserveAspectRatio="xMidYMid slice"
      >
        <g id="lines">
          {polyLines.map((node, key) => (
            <AnimatedPath
              register={registerPolyPath}
              pathColor={pathColor}
              idx={key}
              key={key}
              d={polylineToPath(node.points)}
            />
          ))}
          {linePaths.map((node, key) => (
            <AnimatedPath
              register={registerLinePath}
              pathColor={pathColor}
              idx={key}
              key={key}
              d={node}
            />
          ))}
        </g>
        <g id="circles">
          {circles.map((node, key) => (
            <Circle
              isComplete={isComplete}
              theme={theme}
              key={key}
              cx={node.cx}
              cy={node.cy}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default CircuitBoard;
