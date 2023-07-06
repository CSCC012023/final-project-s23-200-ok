import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
<<<<<<< HEAD

const router = Router();

router.route("/").post(protect, createPost).get(protect, getPosts);
=======
import { postFileUpload } from "../middleware/fileMiddleware.js"

const router = Router();

router.route("/").post(protect, postFileUpload().single('postFile'),createPost).get(protect, getPosts);
>>>>>>> da249f7 (complete full stack post creation)
router.route("/:id").get(protect, getPost).put(protect, updatePost).delete(protect, deletePost);

export default router;
