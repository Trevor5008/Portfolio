import CircuitLine from './CircuitLine';

const circuitPaths = [
		{ points: "20, 30 80, 30 80, 90", delay: 0 },
		{ points: "40, 60 120, 60 120, 140", delay: 0.4 },
];

console.log("Rendering CircuitBoard")

const CircuitBoard = () => {
		<svg 
		    className="absolute z-10 inset-0 w-full h-full" 
		    viewBox="0 0 800 600"
		    xmlns="http://www.w3.org/2000/svg"
		    fill="none"
		>
				{circuitPaths.map((line, i) => (
						<CircuitLine key={i} {...line} />
				))}
		</svg>
}

export default CircuitBoard;
