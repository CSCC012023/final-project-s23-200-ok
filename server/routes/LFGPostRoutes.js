import { Router } from "express";
import {
  createLFGPost,
  getLFGPosts,
  getLFGPost,
  getLFGPostsFiltered,
  updateLFGPost,
  deleteLFGPost,
  createLFGComment,
  getLFGComments,
  updateLFGComment,
  deleteLFGComment,
} from "../controllers/LFGPostController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkBlockedUser } from "../middleware/blockUserMiddleware.js";

const router = Router();
const blockCheck = await checkBlockedUser('lfgpost');

router.route("/").post(protect, createLFGPost).get(protect, getLFGPosts);
router.route("/:id/comments/:id").put(protect, updateLFGComment).delete(protect, deleteLFGComment);
router.route("/:id/comments").post(protect, createLFGComment).get(protect, blockCheck, getLFGComments)
router.route("/filter").get(protect, getLFGPostsFiltered);
router.route("/:id").get(protect, blockCheck, getLFGPost).put(protect, updateLFGPost).delete(protect, deleteLFGPost);

export default router;
