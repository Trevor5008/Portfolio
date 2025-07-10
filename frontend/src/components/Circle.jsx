const Circle = ({ isComplete, theme, cx, cy, delay = 0 }) => {
    return (
		<circle
		    cx={cx}
			cy={cy}
			r="2.8"
			className={`
                ${theme == 'light' ? "stroke-rose-200 " : "stroke-cyan-400 "}
                ${isComplete && "animate-pulse"}
                ${isComplete && theme == 'light' ? "fill-cyan-100" : isComplete ? "fill-cyan-600" : "fill-none"}`
            }
			strokeWidth="1"
			style={{
				animationDelay: `${delay}s`
			}}
		/>
    )
}

export default Circle;
