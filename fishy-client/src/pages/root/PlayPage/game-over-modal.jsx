import React, { useEffect, useState } from "react";

const GameOverModal = ({ gameState }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (gameState?.status === "completed") {
      setIsVisible(true);
    }
  }, [gameState]);

  if (!gameState || !isVisible) return null;

  if (gameState.status !== "completed") return null;
  const winner = gameState.winner;
  console.log(gameState.players.white.playerId === winner ? "white" : "black");

  const winnerColor =
    gameState.players.white.playerId === winner ? "white" : "black";
  const winnerName = gameState.players[winnerColor]?.playerName;

  const closeModal = () => setIsVisible(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-lg bg-gray-600 p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-yellow-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          Game Over
        </h2>
        <p className="text-lg mb-4">
          {winner
            ? `${winnerName} (${winnerColor}) has won the game!`
            : "Game ended in a draw"}
        </p>
        {gameState.gameOverReason && (
          <p className="text-sm text-gray-600 mb-6">
            Reason: {gameState.gameOverReason}
          </p>
        )}
        <button
          onClick={closeModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
