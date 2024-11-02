import { MdTimer } from "react-icons/md";

const ChessClockDisplay = ({ timeData }) => {
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };


  console.log(timeData);
  
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
      <div
        className={`flex items-center justify-between p-4 rounded-lg border`}
      >
        <div className="flex items-center gap-2">
          <MdTimer
            size={30}
            className={
              timeData.currentTurn === "black"
                ? "text-orange-600"
                : "text-gray-500"
            }
          />
          <span className="font-medium">Black</span>
        </div>
        <span
          className={`font-mono text-2xl font-bold ${
            timeData.turn === "black" ? "text-black" : "text-gray-500"
          }`}
        >
          {formatTime(timeData.black)}
        </span>
      </div>

      <div
        className={`flex items-center justify-between p-4 rounded-lg border `}
      >
        <div className="flex items-center gap-2">
          <MdTimer
            size={24}
            className={
              timeData.currentTurn === "white"
                ? "text-orange-600"
                : "text-gray-500"
            }
          />
          <span className="font-medium">White</span>
        </div>
        <span
          className={`font-mono text-2xl font-bold ${
            timeData.turn === "white" ? "text-black" : "text-gray-500"
          }`}
        >
          {formatTime(timeData.white)}
        </span>
      </div>
    </div>
  );
};

export default ChessClockDisplay;
