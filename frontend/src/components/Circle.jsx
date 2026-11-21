import { themeColors } from "../data/themes.js";

const Circle = ({ isComplete, theme, cx, cy }) => {
  const palette = themeColors[theme];

  return (
    <circle
      cx={cx}
      cy={cy}
      r="2.8"
      className={`${palette.circleStroke} ${
        isComplete ? palette.circleFill : "fill-none"
      }`}
      strokeWidth="1"
    />
  );
};

export default Circle;
