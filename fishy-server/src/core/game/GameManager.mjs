

export const gameManager = (io, socket, games) => {
  socket.on("game:join", (gameId) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      if (game.handlePlayerConnect(socket.id)) {
        socket.join(gameId);
        const gameState = game.getGameState();
        socket.emit("game:join:success", gameState);
        io.to(gameId).emit("game:state:update", gameState);
      }
    }
  });

  socket.on("game:move", ({ gameId, from, to, promotion }) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      const result = game.makeMove(from, to, promotion);
      if (result) {
        io.to(gameId).emit("game:state:update", result.gameState);
      }
    }
  });

  socket.on("disconnect", () => {
    const game = games.find(
      (g) =>
        g.players.white.socketId === socket.id ||
        g.players.black.socketId === socket.id
    );

    if (game) {
      const disconnectInfo = game.handlePlayerDisconnect(socket.id);
      if (disconnectInfo) {
        io.to(game.id).emit("game:player:disconnected", {
          color: disconnectInfo.color,
          timeRemaining: disconnectInfo.timeRemaining,
          gameStatus: disconnectInfo.gameStatus,
        });
        io.to(game.id).emit("game:state:update", game.getGameState());
      }
    }
  });
};
