import { Router } from "express";
import {
  createLFGPost,
  getLFGPosts,
  getLFGPost,
  getLFGPostsFiltered,
  updateLFGPost,
  deleteLFGPost,
} from "../controllers/LFGPostController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// router.route("/").post(protect, createLFGPost).get(protect, getLFGPosts);
// router.route("/:id").get(protect, getLFGPost).put(protect, updateLFGPost).delete(protect, deleteLFGPost);

router.route("/").post(createLFGPost).get(getLFGPosts);
router.route("/filter").get(getLFGPostsFiltered);
router.route("/:id").get(getLFGPost).put(updateLFGPost).delete(deleteLFGPost);

export default router;
