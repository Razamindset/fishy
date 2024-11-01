import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store/authStore";
import { socket } from "../../../../socket";

const CreateGameComponent = () => {
  const gameFormats = [
    { time: "1+0", type: "Bullet", timeSeconds: 60 },
    { time: "2+1", type: "Bullet", timeSeconds: 121 },
    { time: "3+0", type: "Blitz", timeSeconds: 180 },
    { time: "3+2", type: "Blitz", timeSeconds: 182 },
    { time: "5+0", type: "Blitz", timeSeconds: 300 },
    { time: "5+3", type: "Blitz", timeSeconds: 303 },
    { time: "10+0", type: "Rapid", timeSeconds: 600 },
    { time: "10+5", type: "Rapid", timeSeconds: 605 },
    { time: "15+10", type: "Rapid", timeSeconds: 910 },
    { time: "30+0", type: "Classical", timeSeconds: 1800 },
    { time: "30+20", type: "Classical", timeSeconds: 1820 },
    { time: "30+30", type: "Classical", timeSeconds: 1820 },
  ];

  const [gameData, setGameData] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuthStore();

  useEffect(() => {
    socket.on("matchmaking:match_found", (data) => {
      console.log(data);

      navigate("/play/" + data.gameId + "?color=" + data.color, {
        replace: true,
      });
      setGameData(data);
    });

    return () => {
      socket.off("matchmaking:match_found");
    };
  }, []);

  const handleJoinQueue = (type, seconds) => {
    console.log("clicked");

    socket.emit("matchmaking:queue", {
      playerId: user._id,
      playerName: user.name,
      playerRating: 1500,
      timeFormat: type,
      timeSeconds: seconds,
    });
  };

  return (
    <div className="rounded-md  flex-1 w-full md:w-3/4">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        {gameFormats.map((format, i) => (
          <button
            key={i}
            onClick={() => {
              handleJoinQueue(format.type, format.timeSeconds);
            }}
            className="h-28 flex flex-col items-center justify-center gap-1 bg-slate-900/20 border border-gray-600 rounded-lg hover:bg-slate-900/50 hover:border-orange-500 transition cursor-pointer"
          >
            <span className="text-2xl md:text-3xl font-semibold">
              {format.time}
            </span>
            <span className="text-xl text-gray-400">{format.type}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CreateGameComponent;
