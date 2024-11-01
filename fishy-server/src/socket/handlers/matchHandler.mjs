import { gameManager } from "../../core/game/GameManager.mjs";
import {
  removeFromQueue,
  startMatchmaking,
} from "../../core/game/matching.mjs";
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

    console.log("game_queue", matching_queue);
  });

  // Handle all game realted Logic
  gameManager(io, socket, games);

  // Handle disconnection and remove player from queue
  socket.on("disconnect", () => {
    removeFromQueue(socket.id, matching_queue);
  });
};

const startMatching = (io, stats) => {
  startMatchmaking(io, matching_queue, games, stats);
};

export { matchHandler, startMatching };
