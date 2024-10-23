export class ServerStats {
  constructor() {
    this.connectedUsers = 0;
    this.latency = 0;
  }

  onUserConnect() {
    this.connectedUsers++;
  }

  onUserDisconnect() {
    this.connectedUsers--;
  }

  trackLatency(latency) {
    this.latency = latency;
  }

  getStats() {
    return {
      connectedUsers: this.connectedUsers,
      latency: this.latency,
    };
  }
}
