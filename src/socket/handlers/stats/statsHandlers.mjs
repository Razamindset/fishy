import { ClientStatsManager } from "./clientStatsHandler.mjs";
import { ServerStatsManager } from "./serverStatsHandler.mjs";

const serverStats = new ServerStatsManager();
const clientManagers = new Map();

export const setupStatsHandlers = (io, socket) => {
  // Create client-specific stats manager
  const clientStats = new ClientStatsManager(socket);
  clientManagers.set(socket.id, clientStats);

  // Setup initial connection
  serverStats.incrementConnectedUsers();
  serverStats.broadcastStats(io);

  // Start monitoring client-specific stats
  clientStats.startLatencyMonitoring();

  // Handle stats requests
  socket.on("request-stats", () => {
    socket.emit("server:stats:update", serverStats.getStats());
  });

  socket.on("disconnect", () => {
    // Stop client-specific latency monitoring and remove from map
    const clientStats = clientManagers.get(socket.id);
    if (clientStats) {
      clientStats.stopLatencyMonitoring();
      clientManagers.delete(socket.id);
    }

    // Update server stats
    serverStats.decrementConnectedUsers();
    serverStats.broadcastStats(io);
  });
  return { serverStats };
};
