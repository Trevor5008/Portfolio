import { useEffect, useState } from 'react'
import CircuitBoard from './components/CircuitBoard'
import TitleCard from './components/TitleCard';

function App() {
    const [isComplete, setIsComplete] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light')

    useEffect(() => {
    }, [theme]);

    const handleChange = () => {
        let newTheme = theme == 'dark' ? 'light' : 'dark';
        console.log(`Changing theme from ${theme} to ${newTheme}`)
        localStorage.setItem("theme", newTheme);  
        setTheme(newTheme)
    }

    return (
        <div className={`${theme == 'dark' ? "bg-black" : "bg-blue-600"}` + " w-full h-screen"}>
            <CircuitBoard 
                setIsComplete={setIsComplete}
                theme={theme}
                handleSwitch={handleChange}
            />
            {isComplete && <TitleCard theme={theme}/> }
        </div>
    )
}

export default App

