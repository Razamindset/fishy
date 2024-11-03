import { useEffect, useState } from "react";
import { FaClock, FaUsers } from "react-icons/fa";
import { socket } from "../../../../../socket";

const ServerStatsComponent = () => {
  const [serverStats, setServerStats] = useState({
    connectedUsers: "?",
    gamesInPlay: "?",
  });

  useEffect(() => {
    const handleStats = (stats) => {
      if (stats) {
        setServerStats(stats);
      }
    };

    // Set up listeners
    socket.on("connect", () => socket.emit("request-stats"));
    socket.on("server:stats:update", handleStats);

    // Request stats if already connected
    socket.connected && socket.emit("request-stats");

    // Retry if stats are not received within 2 seconds
    const timeoutId = setTimeout(() => {
      if (serverStats.connectedUsers === "?" && socket.connected) {
        socket.emit("request-stats");
      }
    }, 2000);

    return () => {
      socket.off("connect");
      socket.off("send-stats", handleStats);
      clearTimeout(timeoutId);
    };
  }, [serverStats.connectedUsers]);

  return (
    <>
      <div className="flex items-center gap-2 text-gray-100">
        <FaUsers className="h-5 w-5" />
        <span className="font-semibold text-base">
          {serverStats.connectedUsers} players
        </span>
      </div>

      <div className="flex items-center gap-2 text-gray-400 mt-2">
        <FaClock className="h-5 w-5" />
        <span>{serverStats.gamesInPlay} games in play</span>
      </div>
    </>
  );
};

export default ServerStatsComponent;
