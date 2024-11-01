import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import { setupSocketHandlers } from "./socket/socketHandlers.mjs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/authRoutes.mjs";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);
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
    origin: ["http://localhost:5173"],
  },
});

setupSocketHandlers(io);

app.get("/", (result, res) => {
  res.send("Hello This is a Chess App server");
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
