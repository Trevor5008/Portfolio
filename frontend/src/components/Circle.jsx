const Circle = ({ cx, cy, delay = 0 }) => {
    return (
		<circle
		    cx={cx}
			cy={cy}
			r="2.8"
			className="stroke-cyan-400 fill-none"
			strokeWidth="1"
			style={{
				animationDelay: `${delay}s`
			}}
		/>
    )
}

export default Circle;
