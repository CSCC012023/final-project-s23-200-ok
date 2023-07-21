import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import LFGPostRoutes from "./routes/LFGPostRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import friendRequestRoutes from "./routes/friendRequestRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ user1Id, user2Id }) => {
    const room = [user1Id, user2Id].sort().join("-");
    socket.join(room);
  });

  socket.on("newMessage", ({ user1Id, user2Id, message }) => {
    const roomId = [user1Id, user2Id].sort().join("-");
    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// new 
global.mongoose = mongoose;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export let gridBucket;
export let gfs;
export let gridfsBucket;
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
  gridBucket = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: 'postFiles'});
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/lfg", LFGPostRoutes);
app.use("/api/friendrequests", friendRequestRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});