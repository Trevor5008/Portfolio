import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedPath = ({ d, duration = 5, setIsComplete }) => {
  const ref = useRef(null);

  useEffect(() => {
    const length = ref.current.getTotalLength();
    gsap.fromTo(ref.current, {
      strokeDasharray: length,
      strokeDashoffset: length
    }, {
      strokeDashoffset: 0,
      duration,
      // repeat: -1, // looping
      // yoyo: true, // back-and-forth tracing
      onComplete: () => {
        gsap.to(ref.current, {
          stroke: "##00d3f2",
          duration: 0.5
        })
        setIsComplete(true)
      },
      ease: "power1.inOut"
    });
  }, []);

  return (
    <path
        ref={ref}
        d={d}
        className="path stroke-cyan-100 fill-none"
        strokeWidth="1"
    />
  )
}

export default AnimatedPath;
