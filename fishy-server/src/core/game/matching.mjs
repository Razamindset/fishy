import { ChessGame } from "./game.mjs";

const RATING_THRESHOLD = 200;
const MATCH_CHECK_INTERVAL = 1000;

export const findMatch = (player, queue) => {
  return queue.find((opponent) => {
    if (opponent.playerId === player.playerId) return false;

    if (opponent.timeSeconds !== player.timeSeconds) return false;

    const ratingDiff = parseInt(
      Math.abs(opponent.playerRating - player.playerRating)
    );

    return ratingDiff <= RATING_THRESHOLD;
  });
};

// Game creation
export const createGame = (player1, player2, games) => {
  const game = new ChessGame(player1, player2, player1.timeSeconds);
  games.push(game);
  return game.getGameState();
};

export const removeFromQueue = (playerId, matching_queue) => {
  const index = matching_queue.findIndex(
    (player) => player.playerId === playerId
  );
  if (index !== -1) {
    matching_queue.splice(index, 1);
  }
};

export const startMatchmaking = (io, matching_queue, games, serverStats) => {
  setInterval(() => {
    if (matching_queue.length < 2) return;

    matching_queue.sort((a, b) => a.queuedAt - b.queuedAt);

    // Find a match for each player in the queue
    matching_queue.forEach((player) => {
      const opponent = findMatch(player, matching_queue);
      // console.log("player:", player, "opponent", opponent);
      if (opponent) {
        const game = createGame(player, opponent, games);

        // Data that should be sent to the players
        const opponentData = {
          gameId: game.id,
          color:
            player.playerId === game.players.white.playerId ? "white" : "black",
        };
        io.to(player.socketId).emit("matchmaking:match_found", opponentData);
        const playerData = {
          gameId: game.id,
          color:
            opponent.playerId === game.players.white.playerId
              ? "white"
              : "black",
        };
        io.to(opponent.socketId).emit("matchmaking:match_found", playerData);
        removeFromQueue(player.playerId, matching_queue);
        removeFromQueue(opponent.playerId, matching_queue);
      }
    });

    serverStats.incrementGamesInPlay();
    serverStats.broadcastStats(io);
  }, MATCH_CHECK_INTERVAL);
};
