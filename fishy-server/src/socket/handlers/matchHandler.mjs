import { removeFromQueue, startMatchmaking } from "../../utils/matching.mjs";
import { SOCKET_EVENTS } from "../events/eventTypes.mjs";

const games = [];
const matching_queue = [];

const matchHandler = (io, socket) => {
  socket.on(SOCKET_EVENTS.MATCHMAKING.QUEUE, (playerData) => {
    if (matching_queue.find((player) => player.socketId === socket.id)) {
      return;
    }
    matching_queue.push({
      ...playerData,
      socketId: socket.id,
      queuedAt: Date.now(),
    });
    console.log("Matching queue:", matching_queue);
  });

  // Handle disconnection and remove player from queue
  socket.on("disconnect", () => {
    removeFromQueue(socket.id, matching_queue);
  });
};

const startMatching = (io) => {
  startMatchmaking(io, matching_queue, games);
};

export { matchHandler, startMatching };