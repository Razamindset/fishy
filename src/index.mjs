import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import { setupSocketHandlers } from "./socket/socketHandlers.mjs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/authRoutes.mjs";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api", userRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

setupSocketHandlers(io);

const clientBuildPath = path.join(__dirname, "..", "web", "dist");
app.use(express.static(clientBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
