import { matchHandler, startMatching } from "./handlers/matchHandler.mjs";
import { setupStatsHandlers } from "./handlers/statsHandlers.mjs";

const setupSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    const statsHandlers = setupStatsHandlers(socket, io);
    statsHandlers.onConnect();

    // All the handlers here
    matchHandler(io, socket);
    startMatching(io);

    socket.on("disconnect", () => {
      statsHandlers.onDisconnect();
    });
  });
};

export { setupSocketHandlers };
