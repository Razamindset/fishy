import React, { useEffect, useState } from "react";
import { socket } from "../../../../socket";
import { FaClock, FaSignal, FaUsers } from "react-icons/fa";

const HomePageServerStats = () => {
  const [serverStats, setServerStats] = useState({
    connectedUsers: "?",
    latency: "?",
    gamesToday: "?",
  });

  useEffect(() => {
    const handleStats = (stats) => {
      if (stats) {
        setServerStats(stats);
      }
    };

    // Set up listeners
    socket.on("connect", () => socket.emit("request-stats"));
    socket.on("send-stats", handleStats);

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
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg mt-4">
      <div className="flex items-center gap-2 text-gray-100">
        <FaUsers className="h-5 w-5" />
        <span className="font-semibold text-base">
          {serverStats.connectedUsers} players
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-100">
        <FaSignal className="h-5 w-5" />
        <span className="font-semibold text-base">
          {serverStats.latency} ms
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-400 mt-2">
        <FaClock className="h-5 w-5" />
        <span>{serverStats.gamesToday} games in play</span>
      </div>
    </div>
  );
};

export default HomePageServerStats;
