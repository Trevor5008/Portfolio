const TitleCard = () => {
  return (
    <div id="titleCard" 
      className="absolute inset-0 flex items-center justify-center border border-cyan-400 text-cyan-400">
      <div className="text-center p-8">
        <h1 className="font-rock-salt text-2xl">Trevor Werner</h1>
        <button className="font-rock-salt text-xs text-cyan-400 border-2 p-2 w-20 mt-10 rounded">Enter</button>
      </div>
    </div>
  )
}

export default TitleCard;


