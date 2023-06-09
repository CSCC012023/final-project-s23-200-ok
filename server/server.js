import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import LFGpostRoutes from "./routes/LFGpostRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/LFGposts", LFGpostRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
