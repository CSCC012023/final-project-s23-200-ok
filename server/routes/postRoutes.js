import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostsByFriends,
  getPost,
  updatePost,
  deletePost,
  reactToPost
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import { postFileUpload }from "../middleware/fileMiddleware.js"
import { checkBlockedUser } from "../middleware/blockUserMiddleware.js";

const router = Router();
const blockCheck = await checkBlockedUser('post');

router.route("/").post(protect, postFileUpload().single('PostFile'), createPost).get(protect, getPosts);
router.route("/byfriends").get(protect, getPostsByFriends)
router.route("/:id/react").patch(protect, reactToPost);
router.route("/:id").get(protect, blockCheck, getPost).delete(protect, deletePost);

export default router;
