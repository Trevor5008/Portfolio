import { useState } from 'react'
import CircuitBoard from './components/CircuitBoard'
import TitleCard from './components/TitleCard';

function App() {
  const [isComplete, setIsComplete] = useState(false)
  return (
    <div className="w-full h-screen bg-black">
		  <CircuitBoard setIsComplete={setIsComplete}/>
          {isComplete && <TitleCard /> }
    </div>
  )
}

export default App

