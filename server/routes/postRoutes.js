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
import { postFileUpload }from "../middleware/fileMiddleware.js"

const router = Router(); 

router.route("/").post(protect, postFileUpload().single('PostFile'), createPost).get(protect, getPosts);
router.route("/:id/react").patch(protect, reactToPost);
router.route("/:id").delete(protect, deletePost);
// router
//   .route("/:id")
//   .get(protect, getPost)
//   .put(protect, updatePost)
//   .delete(protect, deletePost);

export default router;
