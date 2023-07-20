import { Router } from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/:id").get(protect, getMessages);
router.route("/").post(protect, createMessage);

export default router;
