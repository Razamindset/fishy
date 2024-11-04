//? I know this is shitty code, but I'm tired and this is the best I can do right now

let timerInstance = null;

//! Instead of individual intervals per game, use a single interval for all games
export const initializeGameTimer = (io, socket, games, serverStats) => {
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
          const winner = game.currentTurn === "white" ? "black" : "white";

          handleGameEnd(
            io,
            socket,
            games,
            game,
            winner,
            "timeout",
            serverStats
          );
        }
      }
    });
  }, 100); // Update more frequently (10 times per second)
};

//* When a game ends store in db or something
const handleGameEnd = (
  io,
  socket,
  games,
  game,
  winner,
  reason,
  serverStats
) => {
  game.endGame(winner, reason);
  console.log("game ended", game.getGameState());
  io.to(game.id).emit("game:state:update", game.getGameState());

  //* When game is complete remove it from the array
  games = games.filter((g) => g.id !== game.id);
  serverStats.decrementGamesInPlay();
  serverStats.broadcastStats(io);
  socket.leave(game.id);
};

export const gameManager = (io, socket, games, serverStats) => {
  initializeGameTimer(io, socket, games, serverStats);

  socket.on("game:join", (gameId, playerId) => {
    const game = games.find((g) => g.id === gameId);

    if (game) {
      if (game.handlePlayerConnect(playerId, socket.id)) {
        socket.join(gameId);
        io.to(gameId).emit("game:state:update", game.getGameState());
      } else {
        //* Handle connection for users other thatn players may be spectating etc leave empty for now
      }
    }
  });

  socket.on("game:resign", (gameId, playerId) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      const resigantion = game.resignGame(playerId);
      if (resigantion) {
        io.to(gameId).emit("game:state:update", game.getGameState());
      }
      //! Remove the game from the games array or maybe wait for rematch etc
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
      console.log("A user disconnected from the game");
      const color = game.getPlayerColorBySocketId(socket.id);
      const winner = color === "white" ? "black" : "white";
      console.log(socket.id, color, game.getGameState());

      if (color) {
        //Now we have the correct user who was disconnected we can implement grace time waiting period and allow for reconnctions before ending the game
        handleGameEnd(
          io,
          socket,
          games,
          game,
          winner,
          "Disconnection",
          serverStats
        );
      }
    }
  });
};
