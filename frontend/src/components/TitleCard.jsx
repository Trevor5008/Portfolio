const TitleCard = ({ theme }) => {

    return (
        <div id="titleCard" 
            className={`${theme == 'light' ? "text-rose-100" : "text-cyan-400"} 
                absolute inset-0 flex flex-col items-center justify-center`}
        >
            <div className="flex flex-col items-center h-1/3 px-2 justify-evenly">
                <h1 className="text-shadow-inherit self-auto font-rock-salt mt-3 
                    tracking-wide text-3xl">
                    Trevor Werner
                </h1>
                <button className="flex justify-center font-rock-salt 
                    cursor-pointer text-xs border-2 py-2 px-6 w-20 hover:bg-rose-200 
                    dark:hover:bg-cyan-500 dark:hover:text-black hover:text-blue-600 mt-10 rounded">
                    Enter
                </button>
            </div>
        </div>
    )
}

export default TitleCard;
