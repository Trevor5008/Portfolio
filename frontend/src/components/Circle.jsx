import { themeColors } from "../data/themes.js";

const Circle = ({ isComplete, theme, cx, cy, delay = 0 }) => {
  return (
    <circle
      cx={cx}
      cy={cy}
      r="2.8"
      className={`
                ${themeColors[theme].circleStroke}
                ${isComplete ? "animate-pulse" : ""}
                ${isComplete ? themeColors[theme].circleFill : "fill-none"}`}
      strokeWidth="1"
      style={{
        animationDelay: `${delay}s`,
      }}
    />
  );
};

export default Circle;
