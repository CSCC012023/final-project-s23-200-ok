import { Router } from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(protect, createProfile).get(protect, getProfile);
router.route("/:id").put(protect, updateProfile).delete(protect, deleteProfile);

export default router;
