import { Router } from "express";
import { createFriendRequest } from "../controllers/friendRequestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/:id").post(protect, createFriendRequest);

export default router;
