import { useEffect } from "react";
import { socket } from "../../socket";

const useLatency = () => {
  useEffect(() => {
    const handlePing = () => socket.emit("pong");

    socket.on("ping", handlePing);

    // Clean up the event listener on unmount
    return () => {
      socket.off("ping", handlePing);
    };
  }, []);
};

export default useLatency;
