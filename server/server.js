import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
 
const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
