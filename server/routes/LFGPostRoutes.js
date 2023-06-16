import { Router } from "express";
import {
  createLFGPost,
  getLFGPosts,
  getLFGPost,
  updateLFGPost,
  deleteLFGPost,
} from "../controllers/LFGPostController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(protect, createLFGPost).get(protect, getLFGPosts);
router.route("/:id").get(protect, getLFGPost).put(protect, updateLFGPost).delete(protect, deleteLFGPost);

export default router;
