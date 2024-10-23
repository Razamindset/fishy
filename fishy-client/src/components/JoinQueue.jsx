import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

const JoinQueue = () => {
  const [gameData, setGameData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("matchmaking:match_found", (data) => {
      navigate("/" + data.gameId);
      setGameData(data);
    });
  }, []);

  const handleJoinQueue = (e) => {
    e.preventDefault();
    socket.emit("matchmaking:queue", {
      playerId: e.target.player_id.value,
      playerName: "Player Name",
      playerRating: 1500,
      timeFormat: "blitz",
      timeSeconds: 180,
    });
  };

  return (
    <div className="border-2 border-gray-700 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <form onSubmit={handleJoinQueue} className="flex flex-col gap-4">
        <input
          type="text"
          name="player_id"
          className="p-3 border border-gray-600 rounded-md bg-gray-900 text-white"
          placeholder="Enter Player ID"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Join Game Queue
        </button>
      </form>
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
