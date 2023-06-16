import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(protect, createPost).get(protect, getPosts);
router.route("/:id").get(protect, getPost).put(protect, updatePost).delete(protect, deletePost);

export default router;
