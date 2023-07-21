import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import LFGPostRoutes from "./routes/LFGPostRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`New websocket connection: ${socket.id}`);

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
    bucketName: 'postFiles'})
    // console.log(gridBucket.s._filesCollection);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/lfg", LFGPostRoutes);
app.use("/api/files", fileRoutes);


app.use(errorHandler);


// Make sure to call httpServer.listen, NOT app.listen!
httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});