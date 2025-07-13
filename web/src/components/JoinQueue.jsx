import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const JoinQueue = () => {
  const [gameData, setGameData] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuthStore();

  useEffect(() => {
    socket.on("matchmaking:match_found", (data) => {
      navigate("/play/" + data.gameId + "?color=" + data.color, {
        replace: true,
      });
      setGameData(data);
    });

    return () => {
      socket.off("matchmaking:match_found");
    };
  }, []);

  const handleJoinQueue = () => {
    socket.emit("matchmaking:queue", {
      playerId: user._id,
      playerName: user.name,
      playerRating: 1500,
      timeFormat: "blitz",
      timeSeconds: 180,
    });
  };

  return (
    <div className="border-2 border-gray-700 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <button
        onClick={handleJoinQueue}
        className="bg-green-500 text-black p-4 rounded-md"
      >
        Join game
      </button>
      {gameData && (
        <div className="mt-6 p-4 bg-gray-700 rounded-md">
          <p className="text-xl font-semibold text-green-400">Match Found!</p>
          <p>
            Game ID: <span className="font-bold">{gameData.gameId}</span>
          </p>
          <p>
            Your Color:{" "}
            <span className="font-bold capitalize">{gameData.color}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default JoinQueue;
