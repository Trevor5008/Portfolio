import { useEffect, useState } from 'react'
import CircuitBoard from './components/CircuitBoard'
import TitleCard from './components/TitleCard';

function App() {
    const [isComplete, setIsComplete] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light')
    
    
    console.log(`Animation is complete: ${isComplete}`)
    useEffect(() => {
    }, [theme]);

    const handleChange = () => {
        let newTheme = theme == 'dark' ? 'light' : 'dark';
        console.log(`Changing theme from ${theme} to ${newTheme}`)
        localStorage.setItem("theme", newTheme);  
        setIsComplete(false) 
        setTheme(newTheme)
    }

    return (
        <div className={`${theme == 'dark' ? "bg-neutral-950" : "bg-blue-900"}` + " w-full h-screen"}>
            <CircuitBoard 
                setIsComplete={setIsComplete}
                isComplete={isComplete}
                theme={theme}
                handleSwitch={handleChange}
            />
            {isComplete && <TitleCard theme={theme}/> }
        </div>
    )
}

export default App

