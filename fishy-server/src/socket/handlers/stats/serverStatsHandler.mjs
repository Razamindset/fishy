export class ServerStatsManager {
  constructor() {
    this.stats = {
      connectedUsers: 0,
      gamesInPlay: 0,
    };
  }

  incrementConnectedUsers() {
    this.stats.connectedUsers++;
    this.broadcastStats();
  }

  decrementConnectedUsers() {
    this.stats.connectedUsers--;
    this.broadcastStats();
  }

  incrementGamesInPlay() {
    this.stats.gamesInPlay++;
    this.broadcastStats();
  }
  decrementGamesInPlay() {
    this.stats.gamesInPlay--;
    this.broadcastStats();
  }

  getStats() {
    return this.stats;
  }

  broadcastStats(io) {
    if (io) {
      io.emit("server:stats:update", this.stats);
    }
  }
}
