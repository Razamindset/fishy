import { useEffect, useState } from "react";
import { socket } from "../../socket";
import JoinQueue from "../../components/JoinQueue";
import Latency from "../../components/Latency";

const HomePage = () => {
  const [serverStats, setServerStats] = useState(null);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to the server");
      // Request stats immediately after connecting
      socket.emit("request-stats");
    };

    const handleStats = (stats) => {
      setServerStats(stats);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from the server");
      setServerStats(null); // Clear stats on disconnect
    };

    // Set up listeners
    socket.on("connect", handleConnect);
    socket.on("send-stats", handleStats);
    socket.on("disconnect", handleDisconnect);

    // If socket is already connected, request stats
    if (socket.connected) {
      socket.emit("request-stats");
    }

    // Cleanup function
    return () => {
      socket.off("connect", handleConnect);
      socket.off("send-stats", handleStats);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  // Optional: Add retry mechanism if stats aren't received within a timeout
  useEffect(() => {
    if (!serverStats && socket.connected) {
      const timeoutId = setTimeout(() => {
        console.log("No stats received, requesting again...");
        socket.emit("request-stats");
      }, 2000); // Wait 2 seconds before retrying

      return () => clearTimeout(timeoutId);
    }
  }, [serverStats]);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Chess Client</h1>
      <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-lg">
        {serverStats ? (
          <div className="text-center">
            <p className="text-lg font-semibold">
              Connected Users: {serverStats.connectedUsers}
            </p>
            <p className="text-lg font-semibold">
              Average Latency: {serverStats.latency} ms
            </p>
          </div>
        ) : (
          <p className="text-lg text-gray-400 text-center">
            Loading server stats...
          </p>
        )}
      </div>
      <JoinQueue />
      <Latency />
    </div>
  );
};

export default HomePage;
