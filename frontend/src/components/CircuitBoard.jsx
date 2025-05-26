import CircuitLine from './CircuitLine';
import Circle from './Circle';
import linePoints from '../data/lines.js'
import circles from '../data/circles.js'

const CircuitBoard = () => {
		return (
				<svg className="w-full h-full" viewBox="0 0 960 560" preserveAspectRatio="none" >
				<g id="lines">
				    {linePoints.map((node, key) => {
							return <CircuitLine key={key} points={node.points} />
					})}
				</g>
				<g id="circles">
				    {circles.map((node, key) => {
							return <Circle key={key} cx={node.cx} cy={node.cy} />
				    })}
				</g>
				</svg>
		)
}

export default CircuitBoard;
