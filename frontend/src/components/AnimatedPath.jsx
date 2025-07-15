const AnimatedPath = ({ idx, register, pathColor, d }) => {
    return (
        <path
            ref={(el) => register(el, idx)}
            d={d}
            className={`${pathColor} path fill-none`}
            strokeWidth="1"
        />
    )
}

export default AnimatedPath;
