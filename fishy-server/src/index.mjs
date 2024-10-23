import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import { setupSocketHandlers } from "./socket/socketHandlers.mjs";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const PORT = 3000;
setupSocketHandlers(io);

app.get("/", (result, res) => {
  res.send("Hello This is a Chess App server");
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
