import { themeColors } from "../data/themes.js";
import { namePath } from "../data/namePath.js";

const TitleCard = ({ isComplete, theme }) => {
  return (
    <div
      id="titleCard"
      className={`${isComplete ? themeColors[theme].text : themeColors[theme].default.text} 
absolute inset-0 flex flex-col items-center justify-center`}
    >
      <div className="flex flex-col items-center h-1/3 px-2 justify-evenly">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="1179.000000pt"
          height="492.000000pt"
          viewBox="0 250 1179.000000 492.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(-200.000000,500.000000) scale(0.030000,-0.10000)"
            stroke={`${isComplete ? themeColors[theme].svg : themeColors[theme].default.svg}`}
            strokeWidth="28"
            fill="none"
          >
            <g transform="scale(4.5,1.7)">
              {/* namePath is an array of path values converted to a space delimited string */}
              <path d={namePath.join(" ")} />
            </g>
          </g>
        </svg>

        <button
          className={`flex justify-center z-2 font-rock-salt cursor-pointer text-xs font-bold ring-1 py-3 px-8 w-24 mt-8 mb-6 rounded-lg hover:animate-pulse 
        ${isComplete ? themeColors[theme].hover : ""}`}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default TitleCard;
