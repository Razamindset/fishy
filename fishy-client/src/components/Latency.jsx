import { useEffect } from "react";
import { socket } from "../socket";

const Latency = () => {
  useEffect(() => {
    socket.on("ping", () => {
      socket.emit("pong");
    });

    socket.on("latency", (latency) => {
      setLatency(latency);
    });
  }, []);
};

export default Latency;
