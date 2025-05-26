import CircuitLine from './CircuitLine';
import Circle from './Circle';
import Path from './Path';
import polyLines from '../data/polyLines.js'
import circles from '../data/circles.js'
import linePaths from '../data/linePaths.js'

const CircuitBoard = () => {
		return (
				<svg className="w-full h-full" viewBox="0 0 960 560" preserveAspectRatio="none" >
				<g id="polyLines">
				    {polyLines.map((node, key) => {
							return <CircuitLine key={key} points={node.points} />
					})}
				    {linePaths.map((node, key) => {
							return <Path key={key} d={node} />
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
