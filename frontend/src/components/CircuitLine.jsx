const CircuitLine = ({ points, delay = 0 }) => {
    return (
		<polyline
			points={points}
			className="stroke-cyan-400 fill-none"
			strokeWidth="2"
			style={{
				animationDelay: `${delay}s`
			}}
		/>
    )
}

export default CircuitLine;
