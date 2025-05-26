const Path = ({ d, delay = 0 }) => {
    return (
		<path
			d={d}
			className="path stroke-cyan-400 fill-none"
			strokeWidth="1"
			style={{
				animationDelay: `${delay}s`
			}}
		/>
    )
}

export default Path;
