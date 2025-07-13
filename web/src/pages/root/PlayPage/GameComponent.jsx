import { useEffect, useState } from "react";
import Chessboard from "../../../components/board/Chessboard";
import { Chess } from "chess.js";
import useChessSounds from "../../../utils/hooks/useSound";
import { socket } from "../../../socket";
import { useAuthStore } from "../../../store/authStore";
import Buttons from "./Buttons";
import UserIconAndClock from "./UserIconAndClock";
import PreviousMoves from "./PreviousMoves";
import GameOverModal from "./game-over-modal";

function GameComponent({ gameId }) {
  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const { handleMoveSounds } = useChessSounds(chess);
  const [gameState, setGameState] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const { user } = useAuthStore();
  const [myColor, setMyColor] = useState(null);

  useEffect(() => {
    socket.emit("game:join", gameId, user._id);

    socket.on("game:state:update", (newGameState) => {
      setGameState(newGameState);

      // Update myColor based on gameState and user ID
      const color = Object.entries(newGameState.players || {}).find(
        ([_, player]) => player.playerId === user._id
      )?.[0];

      setMyColor(color);

      const newChess = new Chess(newGameState.fen);
      setChess(newChess);
      setFen(newChess.fen());
    });

    socket.on("game:time:update", (timeData) => {
      setTimeData(timeData);
    });

    return () => {
      socket.off("game:state:update");
      socket.off("game:time:update");
    };
  }, [gameId, user._id]);

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

  const opponentColor = myColor === "white" ? "black" : "white";

  return (
    <div className="GameComponent p-2 flex items-center justify-between flex-wrap">
      <div className="left w-full md:w-1/2 md:max-w-[545px] px-6">
        <UserIconAndClock
          userData={gameState?.players?.[opponentColor]}
          timeData={timeData}
          color={opponentColor}
          position="top"
        />

        <Chessboard
          initialFen={fen}
          chess={chess}
          orientation={myColor}
          onMove={handleMove}
          allowMoveOpponentPieces={false}
          customArrows={[]}
        />

        <UserIconAndClock
          userData={gameState?.players?.[myColor]}
          timeData={timeData}
          color={myColor}
          position="bottom"
        />
      </div>

      <div className="w-full md:w-1/2 p-3">
        <GameOverModal gameState={gameState} />
        <PreviousMoves />
        <Buttons gameState={gameState} userId={user._id} />
      </div>
    </div>
  );
}

export default GameComponent;
