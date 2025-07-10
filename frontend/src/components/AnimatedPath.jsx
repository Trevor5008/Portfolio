import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedPath = ({ theme, d, duration = 5, setIsComplete }) => {
    const ref = useRef(null);

    useEffect(() => {
        const length = ref.current.getTotalLength();
        let circuitColor = theme == "dark" ? "#3730a3" : "#06b6d4";
        gsap.fromTo(ref.current, {
            strokeDasharray: length,
            strokeDashoffset: length
        }, {
                strokeDashoffset: 1,
                duration,
                // repeat: -1, // looping
                // yoyo: true, // back-and-forth tracing
                onComplete: () => {
                    gsap.to(ref.current, {
                        stroke: circuitColor,
                        duration: 5
                    })
                    setIsComplete(true)
                },
                ease: "power1.inOut"
            });
    }, [theme]);

    return (
        <path
            ref={ref}
            d={d}
            className={
                `${theme == 'dark' ? "stroke-blue-600" : "stroke-cyan-500"}
                path fill-none`
            }
            strokeWidth="1"
        />
    )
}

export default AnimatedPath;
