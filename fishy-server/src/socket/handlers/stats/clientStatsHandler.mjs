export class ClientStatsManager {
  constructor(socket) {
    this.socket = socket;
    this.stats = {
      latency: 0,
    };
    this.pingInterval = null;
  }

  startLatencyMonitoring() {
    this.pingInterval = setInterval(() => {
      const start = Date.now();
      this.socket.emit("ping");
      this.socket.once("pong", () => {
        this.stats.latency = Date.now() - start;
        this.emitStats();
      });
    }, 5000);
  }

  stopLatencyMonitoring() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  emitStats() {
    this.socket.emit("client:stats:update", this.stats);
  }

  getStats() {
    return this.stats;
  }
}
