import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { Router } from "express";
import postRoutes from "./routes/postRoutes.js";

// import env2 from "../"

dotenv.config(); 
 

const router = Router()
router.use('/api/posts', postRoutes);


const app = express();
// const PORT = process.env.PORT || 5000;
const PORT = 5001

app.use(cors());
app.use(express.json());

// console.log();
// console.log("env below");
// console.log(process.env.MONGO_URI);
// console.log("env above");
// console.log();



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
