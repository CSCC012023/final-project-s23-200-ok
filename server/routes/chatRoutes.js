import { Router } from "express";
import {
  getChats,
  getChatById,
  createChat,
} from "../controllers/chatController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(protect, getChats).post(protect, createChat);
router.route("/:id").get(protect, getChatById);

export default router;
