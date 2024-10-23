import { ServerStats } from "../../core/stats/serverStats.mjs";

const serverStats = new ServerStats();

const setupLatencyMonitoring = (io, socket) => {
  let latency = 0;
  const pingInterval = setInterval(() => {
    const start = Date.now();
    socket.emit("ping");

    socket.once("pong", () => {
      latency = Date.now() - start;
      console.log(`Current latency: ${latency}ms`);

      serverStats.trackLatency(latency); // Update latency in server stats
      socket.emit("send-stats", serverStats.getStats());
    });
  }, 5000);

  // Clean up on disconnect
  socket.on("disconnect", () => {
    clearInterval(pingInterval);
  });

  return latency;
};

export const setupStatsHandlers = (socket, io) => {
  // Start monitoring latency and track it in the stats system
  setupLatencyMonitoring(io, socket);

  // Set up handlers for other stats
  socket.on("request-stats", () => {
    const currentStats = serverStats.getStats();
    socket.emit("send-stats", currentStats);
  });

  return {
    onConnect: () => {
      serverStats.onUserConnect();
      io.emit("send-stats", serverStats.getStats());
    },
    onDisconnect: () => {
      serverStats.onUserDisconnect();
      io.emit("send-stats", serverStats.getStats());
    },
  };
};
