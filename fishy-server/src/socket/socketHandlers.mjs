import { matchHandler, startMatching } from "./handlers/matchHandler.mjs";
import { setupStatsHandlers } from "./handlers/statsHandlers.mjs";

const setupSocketHandlers = (io) => {
  let stats = {
    latency: 0,
    connectedUsers: 0,
    gamesToday: 0,
  };

  io.on("connection", (socket) => {
    const statsHandlers = setupStatsHandlers(socket, io, stats);
    statsHandlers.onConnect();

    // All the handlers here
    matchHandler(io, socket);
    startMatching(io, stats);

    socket.on("disconnect", () => {
      statsHandlers.onDisconnect();
    });
  });
};

export { setupSocketHandlers };
