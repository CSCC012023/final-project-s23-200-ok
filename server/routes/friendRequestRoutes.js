import { Router } from "express";
import { createFriendRequest, respondToFriendRequest } from "../controllers/friendRequestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/:recipientUserId").post(protect, createFriendRequest);
router.route("/:friendRequestId").patch(protect, respondToFriendRequest);

export default router;
