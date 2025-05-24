const CircuitLine = ({ points, delay = 0 }) => {
    return (
		<polyline
			points={points}
			className="absolute z-9 stroke-cyan-400 text-cyan-400 fill-none circuit-line"
			strokeWidth="2"
			style={{
				animationDelay: `${delay}s`
			}}
		/>
    )
}

export default CircuitLine;
