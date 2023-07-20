import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  reactToPost
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(protect, createPost).get(protect, getPosts);
router.route("/:id/react").patch(protect, reactToPost);
router.route("/:id").delete(protect, deletePost);

export default router;
