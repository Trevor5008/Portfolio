import { useLayoutEffect, useRef } from 'react';
import { animate } from 'animejs';

const AnimatedPath = ({ d, delay = 0 }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof el.getTotalLength !== 'function') return;

    const length = el.getTotalLength();
    el.style.strokeDasharray = length;
    el.style.strokeDashoffset = length;

    animate({
      targets: el,
      strokeDashoffset: 0,
      duration: 3000,
      easing: 'easeInOutSine',
      delay: delay * 1000,
    });
  }, [d, delay]);

  return (
    <path
        d={d}
        className="path stroke-cyan-400 fill-none"
        strokeWidth="1"
    />
  )
}

export default AnimatedPath;
