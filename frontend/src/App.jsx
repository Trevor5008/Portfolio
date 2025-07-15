import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';
import CircuitBoard from './components/CircuitBoard'
import TitleCard from './components/TitleCard';
import { themeColors } from './data/themes.js';

function App() {
    const [isComplete, setIsComplete] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light')
    const [bgColor, setBgColor] = useState(themeColors[theme].bgColor);
    const [pathColor, setPathColor] = useState(themeColors[theme].stroke);

    const polyPaths = useRef([]);
    const linePaths = useRef([]);

    const registerPolyPath = (el, idx) => {
        if (el) {
            polyPaths.current[idx] = el;
        }
    }
    const registerLinePath = (el, idx) => {
        if (el) {
            linePaths.current[idx] = el;
        }
    }

    useLayoutEffect(() => {

        const validPolyPaths = polyPaths.current.filter(p => p && p.getTotalLength() > 0);
        validPolyPaths.forEach((path) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
        });
        
        gsap.to(validPolyPaths, {
            strokeDashoffset: 0,
            duration: 6.5,
            ease: "power2.inOut",
            onComplete: () => setIsComplete(true)
        });

        const validLinePaths = linePaths.current.filter(p => p && p.getTotalLength() > 0);
        validLinePaths.forEach((path) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
        });
        
        gsap.to(validLinePaths, {
            strokeDashoffset: 0,
            duration: 4.5,
            ease: "power2.inOut",
            onComplete: () => setIsComplete(true)
        });
    }, [theme]);

    const handleThemeChange = () => {
        let newTheme = theme == 'dark' ? 'light' : 'dark';
        localStorage.setItem("theme", newTheme);  
        setIsComplete(false) 
        setTheme(newTheme)
        setBgColor(themeColors[newTheme].bgColor)
        setPathColor(themeColors[newTheme].stroke)
    }

    return (
        <div className={bgColor}>
            <CircuitBoard 
                registerPolyPath={registerPolyPath}
                registerLinePath={registerLinePath}
                pathColor={pathColor}
                setIsComplete={setIsComplete}
                isComplete={isComplete}
                theme={theme}
                bgColor={bgColor} 
                handleSwitch={handleThemeChange}
            />
            {isComplete && <TitleCard theme={theme}/> }
        </div>
    )
}

export default App

