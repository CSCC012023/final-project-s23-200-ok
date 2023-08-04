import { Router } from "express";
import {
  getChats,
  getChatById,
  createChat,
} from "../controllers/chatController.js";

import { protect } from "../middleware/authMiddleware.js";
import { checkBlockedUserChat } from "../middleware/blockUserMiddleware.js";

const router = Router();

router.route("/").get(protect, getChats).post(protect, createChat);
router.route("/:id").get(protect, checkBlockedUserChat, getChatById);

export default router;
