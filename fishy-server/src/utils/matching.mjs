const RATING_THRESHOLD = 200;
const MATCH_CHECK_INTERVAL = 1000;

export const findMatch = (player, queue) => {
  return queue.find((opponent) => {
    if (opponent.socketId === player.socketId) return false;

    if (opponent.timeSeconds !== player.timeSeconds) return false;

    const ratingDiff = parseInt(
      Math.abs(opponent.playerRating - player.playerRating)
    );
    console.log(ratingDiff);

    return ratingDiff <= RATING_THRESHOLD;
  });
};

export const createGame = (player1, player2, games) => {
  const game = {
    id: `game_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
    white: Math.random() < 0.5 ? player1 : player2,
    black: Math.random() < 0.5 ? player1 : player2,
    timeSeconds: player1.timeSeconds,
    status: "pending",
  };
  games.push(game);
  return game;
};

export const removeFromQueue = (socketId, matching_queue) => {
  const index = matching_queue.findIndex(
    (player) => player.socketId === socketId
  );
  if (index !== -1) {
    matching_queue.splice(index, 1);
  }
};

export const startMatchmaking = (io, matching_queue, games) => {
  console.log(matching_queue);

  setInterval(() => {
    // console.log("Finding potential matches");

    if (matching_queue.length < 2) return;

    matching_queue.sort((a, b) => a.queuedAt - b.queuedAt);

    // Find a match for each player in the queue
    matching_queue.forEach((player) => {
      const opponent = findMatch(player, matching_queue);
      console.log("player:", player, "opponent", opponent);
      if (opponent) {
        const game = createGame(player, opponent, games);

        // Data that should be sent to the players
        const opponentData = {
          gameId: game.id,
          color: player.socketId === game.white.socketId ? "white" : "black",
        };
        io.to(player.socketId).emit("matchmaking:match_found", opponentData);
        const playerData = {
          gameId: game.id,
          color: opponent.socketId === game.white.socketId ? "white" : "black",
        };
        io.to(opponent.socketId).emit("matchmaking:match_found", playerData);
        removeFromQueue(player.socketId, matching_queue);
        removeFromQueue(opponent.socketId, matching_queue);
      }
    });
  }, MATCH_CHECK_INTERVAL);
};
