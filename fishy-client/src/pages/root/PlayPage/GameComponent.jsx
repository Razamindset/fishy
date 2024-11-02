import { useEffect, useState } from "react";
import Chessboard from "../../../components/board/Chessboard";
import { Chess } from "chess.js";
import useChessSounds from "../../../utils/hooks/useSound";
import { socket } from "../../../socket";
import { useAuthStore } from "../../../store/authStore";
import ChessClockDisplay from "./Clock";

function GameComponent({ gameId }) {
  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const { handleMoveSounds } = useChessSounds(chess);
  const [gameState, setGameState] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    socket.emit("game:join", gameId, user._id);

    socket.on("game:state:update", (gameState) => {
      setGameState(gameState);
      const newChess = new Chess(gameState.fen);
      setChess(newChess);
      setFen(newChess.fen());
      console.log("Move successful", chess.turn());
    });

    socket.on("game:time:update", (timeData) => {
      setTimeData(timeData);
    });

    return () => {
      socket.off("game:state:update");
    };
  }, []);

  const handleMove = (move) => {
    handleMoveSounds(move);
    const moveData = {
      gameId,
      from: move.from,
      to: move.to,
      promotion: move.promotion,
    };
    socket.emit("game:move", moveData);
  };

  const myColor =
    gameState?.players?.white?.playerId === user._id ? "white" : "black";


    console.log(gameState);
    
  return (
    <div className="GameComponent md:p-6">
      <Chessboard
        initialFen={fen}
        chess={chess}
        orientation={myColor}
        onMove={handleMove}
        allowMoveOpponentPieces={false}
        customArrows={[]}
      />
      {gameState && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Game State</h2>
          <pre className="p-4 rounded-md ">
            {gameState.status}
            {gameState.winner}
          </pre>
        </div>
      )}
      {timeData && <ChessClockDisplay timeData={timeData} />}
    </div>
  );
}

export default GameComponent;
