import { useEffect, useState } from "react";
import Chessboard from "../../../components/board/Chessboard";
import { Chess } from "chess.js";
import useChessSounds from "../../../utils/hooks/useSound";
import { socket } from "../../../socket";

function GameComponent({ gameId, color }) {
  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const { handleMoveSounds } = useChessSounds(chess);

  useEffect(() => {
    socket.emit("game:join", gameId);

    socket.on("game:join:success", (gameState) => {});

    socket.on("game:state:update", (gameState) => {
      console.log(gameState.fen);
      // handleMoveSounds(move);
      const newChess = new Chess(gameState.fen);
      setChess(newChess);
      setFen(newChess.fen());
      console.log("Move successful", chess.turn());
    });

    return () => {
      socket.off("game:join:success");
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

  return (
    <div className="GameComponent md:p-6">
      <Chessboard
        initialFen={fen}
        chess={chess}
        orientation={color}
        onMove={handleMove}
        allowMoveOpponentPieces={false}
        customArrows={[]}
      />
    </div>
  );
}

export default GameComponent;
