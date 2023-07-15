import { Router } from "express";
import {
  createFriendRequest,
  respondToFriendRequest,
  getIncomingFriendRequests,
  getOutgoingFriendRequests
} from "../controllers/friendRequestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/:recipientUserId").post(protect, createFriendRequest);
router.route("/:friendRequestId").patch(protect, respondToFriendRequest);
router.route("/incoming").get(protect, getIncomingFriendRequests);
router.route("/outgoing").get(protect, getOutgoingFriendRequests);

export default router;