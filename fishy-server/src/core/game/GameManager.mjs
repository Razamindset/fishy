let timerInstance = null;

//! Instead of individual intervals per game, use a single interval for all games
export const initializeGameTimer = (io, games) => {
  if (timerInstance) {
    clearInterval(timerInstance);
    timerInstance = null;
  }

  let lastTickTime = Date.now();

  timerInstance = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTickTime;
    lastTickTime = currentTime;

    games.forEach((game) => {
      if (game.status === "active") {
        const currentPlayer = game.players[game.currentTurn];

        // More precise time calculation using actual elapsed time
        currentPlayer.timeRemaining = Math.max(
          0,
          currentPlayer.timeRemaining - deltaTime
        );

        // Broadcast time updates more frequently
        if (game.players.white.connected || game.players.black.connected) {
          io.volatile.to(game.id).emit("game:time:update", {
            white: Math.round(game.players.white.timeRemaining),
            black: Math.round(game.players.black.timeRemaining),
            currentTurn: game.currentTurn,
            serverTime: currentTime, // Send server time for synchronization
          });
        }

        if (currentPlayer.timeRemaining === 0) {
          game.status = "completed";
          game.winner = game.currentTurn === "white" ? "black" : "white";
          console.log("game ended", game.winner, game.status);
          io.to(game.id).emit("game:state:update", game.getGameState());
          //* When game is complete remove it from the array
          games = games.filter((g) => g.id !== game.id);
        }
      }
    });
  }, 100); // Update more frequently (10 times per second)
};

export const gameManager = (io, socket, games) => {
  initializeGameTimer(io, games);

  socket.on("game:join", (gameId, playerId) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      if (game.handlePlayerConnect(playerId)) {
        socket.join(gameId);
        io.to(gameId).emit("game:state:update", game.getGameState());
      }
    }
  });

  socket.on("game:move", ({ gameId, from, to, promotion }) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      const result = game.makeMove(from, to, promotion);
      if (result) {
        io.to(gameId).emit("game:state:update", game.getGameState());
      }
    }
  });

  socket.on("disconnect", () => {
    //! Implement proper leaving game mechanism this code is buggy
    const game = games.find(
      (g) =>
        g.players.white.socketId === socket.id ||
        g.players.black.socketId === socket.id
    );

    if (game) {
      game.handlePlayerDisconnect(socket.id);
      games = games.filter((g) => g.id !== game.id);

      io.to(game.id).emit("game:state:update", game.getGameState());
    }
  });
};
