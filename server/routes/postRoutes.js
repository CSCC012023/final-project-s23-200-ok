import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = Router();

router.route("/").post(createPost).get(getPosts);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

export default router;
