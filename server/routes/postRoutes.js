import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(protect, createPost).get(protect, getPosts);
router.route("/:id").get(protect, getPost).put(protect, updatePost).delete(protect, deletePost);
router.route("/:id/like").patch(protect, likePost);
router.route("/:id/unlike").patch(protect, unlikePost);

export default router;
