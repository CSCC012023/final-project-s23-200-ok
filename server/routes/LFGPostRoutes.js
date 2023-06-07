import { Router } from "express";
import {
  createLFGPost,
  getLFGPosts,
  getLFGPost,
  updateLFGPost,
  deleteLFGPost,
} from "../controllers/LFGPostController.js";

const router = Router();

router.route("/").post(createLFGPost).get(getLFGPosts);
router.route("/:id").get(getLFGPost).put(updateLFGPost).delete(deleteLFGPost);

export default router;
