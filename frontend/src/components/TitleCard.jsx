const TitleCard = () => {
    return (
        <div id="titleCard" 
            className="absolute inset-0 flex flex-col items-center justify-center text-cyan-400">
            <div className="flex flex-col items-center h-1/3 px-2 justify-evenly">
                <h1 className="self-auto font-rock-salt mt-3 text-2xl">Trevor Werner</h1>
                <button className="font-rock-salt text-xs text-cyan-400 border-2 p-2 w-20 mt-10 rounded">Enter</button>
            </div>
        </div>
    )
}

export default TitleCard;
