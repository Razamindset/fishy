const updateStats = (io, stats) => {
  io.emit("send-stats", stats);
};

const setupLatencyMonitoring = (socket, stats) => {
  const pingInterval = setInterval(() => {
    let currentStats = stats;

    const start = Date.now();
    socket.emit("ping");
    socket.once("pong", () => {
      stats.latency = Date.now() - start;
      updateStats(socket.server, currentStats);
    });
  }, 5000);

  socket.on("disconnect", () => {
    clearInterval(pingInterval);
  });
};

export const setupStatsHandlers = (socket, io, stats) => {
  setupLatencyMonitoring(socket, stats);

  socket.on("request-stats", () => {
    socket.emit("send-stats", stats);
  });

  return {
    onConnect: () => {
      stats.connectedUsers++;
      updateStats(io);
    },
    onDisconnect: () => {
      stats.connectedUsers--;
      updateStats(io);
    },
  };
};
