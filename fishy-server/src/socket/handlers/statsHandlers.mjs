import { ServerStats } from "../../core/stats/serverStats.mjs";

const serverStats = new ServerStats();

const setupLatencyMonitoring = (io, socket) => {
  let latency = 0;
  
  // Create a single reusable pong handler
  const handlePong = (start) => {
    latency = Date.now() - start;
    serverStats.trackLatency(latency);
    socket.emit("send-stats", serverStats.getStats());
  };

  const pingInterval = setInterval(() => {
    const start = Date.now();
    
    // Remove any existing pong listener before adding a new one
    socket.removeAllListeners("pong");
    
    // Add the new listener with the current timestamp
    socket.once("pong", () => handlePong(start));
    
    // Send the ping
    socket.emit("ping");
  }, 5000);

  // Clean up on disconnect
  socket.on("disconnect", () => {
    clearInterval(pingInterval);
    socket.removeAllListeners("pong");  // Clean up any remaining pong listeners
  });

  return latency;
};

export const setupStatsHandlers = (socket, io) => {
  // Start monitoring latency and track it in the stats system
  setupLatencyMonitoring(io, socket);

  // Set up handlers for other stats
  const statsHandler = () => {
    const currentStats = serverStats.getStats();
    socket.emit("send-stats", currentStats);
  };

  socket.on("request-stats", statsHandler);

  // Clean up on disconnect
  socket.on("disconnect", () => {
    socket.removeListener("request-stats", statsHandler);
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