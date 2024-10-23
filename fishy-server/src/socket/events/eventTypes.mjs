export const SOCKET_EVENTS = {
  STATS: {
    REQUEST: "request-stats",
    SEND: "send-stats",
  },
  GAME: {
    JOIN: "join-game",
    MOVE: "make-move",
  },
  MATCHMAKING: {
    QUEUE: "matchmaking:queue",
    LEAVE_QUEUE: "matchmaking:leave",
    MATCH_FOUND: "matchmaking:match_found",
  },
  GAME: {
    READY: "game:ready",
    START: "game:start",
    MOVE: "game:move",
    MOVE_MADE: "game:moveMade",
    RESIGN: "game:resign",
    GAME_OVER: "game:gameOver",
    TIME_UPDATE: "game:timeUpdate",
  },
};
