const TitleCard = ({ theme }) => {

    return (
        <div id="titleCard" 
            className={`${theme == 'light' ? "text-rose-200" : "text-cyan-500"} 
                absolute inset-0 flex flex-col items-center justify-center`}
        >
            <div className="flex flex-col items-center h-1/3 px-2 justify-evenly">
                <h1 className="text-shadow-inherit self-auto font-rock-salt mt-3 
                    tracking-wide text-3xl">
                    Trevor Werner
                </h1>
                <button
                    className={`flex justify-center font-rock-salt cursor-pointer text-xs border-2 py-2 px-6 w-24 mt-10 rounded-lg
                        ${theme === 'light' ? 'text-rose-100 hover:bg-rose-200 hover:text-blue-900' 
                        : 'text-cyan-400 hover:bg-cyan-600 hover:text-zinc-950'} hover:animate-pulse`}
                >
                    Enter
                </button>
            </div>
        </div>
    )
}

export default TitleCard;
