import { matchHandler, startMatching } from "./handlers/matchHandler.mjs";
import { setupStatsHandlers } from "./handlers/stats/statsHandlers.mjs";

const setupSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    //* Socket Handlers
    const { serverStats } = setupStatsHandlers(io, socket);
    matchHandler(io, socket, serverStats);
    startMatching(io, serverStats);
  });
};

export { setupSocketHandlers };
