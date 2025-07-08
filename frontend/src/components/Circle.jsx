const Circle = ({ theme, cx, cy, delay = 0 }) => {
    return (
		<circle
		    cx={cx}
			cy={cy}
			r="2.8"
			className={`${theme == 'light' ? "stroke-rose-200" : "stroke-cyan-400"} fill-cyan-900`}
			strokeWidth="1"
			style={{
				animationDelay: `${delay}s`
			}}
		/>
    )
}

export default Circle;
