import Circle from './Circle';
import AnimatedPath from './AnimatedPath';
import polyLines from '../data/polyLines.js'
import circles from '../data/circles.js'
import linePaths from '../data/linePaths.js'


const CircuitBoard = ({ setIsComplete }) => {
  // Converts polyline coords to path 'd' property format
  function polylineToPath(pointsStr) {
    const points = pointsStr.trim().split(' ');
    return `M ${points.join(' ')}`;
  }

  return (
    <svg className="w-full h-screen" viewBox="0 0 960 560" preserveAspectRatio="none" >
      <g id="lines">
          {polyLines.map((node, key) => {
              return <AnimatedPath setIsComplete={setIsComplete} key={key} d={polylineToPath(node.points)} />
          })}
          {linePaths.map((node, key) => {
              return <AnimatedPath setIsComplete={setIsComplete} key={key} d={node} />
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
