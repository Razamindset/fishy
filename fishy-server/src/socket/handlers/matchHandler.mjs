import { gameManager } from "../../core/game/GameManager.mjs";
import {
  removeFromQueue,
  startMatchmaking,
} from "../../core/game/matching.mjs";
import { SOCKET_EVENTS } from "../events/eventTypes.mjs";

//* games is an array of ChessGame instances
const games = [];

//* Every player when requests a new game he is put into this queue
const matching_queue = [];

const matchHandler = (io, socket, serverStats) => {
  socket.on(SOCKET_EVENTS.MATCHMAKING.QUEUE, (playerData) => {
    //* If the player already exists in the queue, remove it and update with new data
    const existingReq = matching_queue.find(
      (player) => player.playerId === playerData.playerId
    );
    if (existingReq) {
      removeFromQueue(playerData.playerId, matching_queue);
    }
    matching_queue.push({
      ...playerData,
      socketId: socket.id,
      queuedAt: Date.now(),
    });
  });

  //todo Handle other ways enter a match like throught link shairing etc

  // Handle all game realted Logic such as joining, leaving, making moves, etc. It uses the the array of game instances
  gameManager(io, socket, games, serverStats);

  // If a user disconnects from the server, remove them from the queue
  socket.on("disconnect", () => {
    removeFromQueue(socket.id, matching_queue);
  });
};

//* This function use a setInterval to check for potencial matches in the matching_queue array
const startMatching = (io, serverStats) => {
  startMatchmaking(io, matching_queue, games, serverStats);
};

export { matchHandler, startMatching };
