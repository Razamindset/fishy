import { useEffect, useState } from "react";
import { socket } from "../../../../../socket";
import { FaSignal } from "react-icons/fa";

const ClientStatsComponent = () => {
  const [clientStats, setClientStats] = useState({
    latency: "?",
  });
  useEffect(() => {
    socket.on("client:stats:update", (stats) => {
      if (stats) {
        setClientStats(stats);
      }
    });

    return () => {
      socket.off("client:stats:update");
    };
  }, []);

  return (
    <div className="flex items-center gap-2 text-gray-100">
      <FaSignal className="h-5 w-5" />
      <span className="font-semibold text-base">{clientStats.latency} ms</span>
    </div>
  );
};

export default ClientStatsComponent;
