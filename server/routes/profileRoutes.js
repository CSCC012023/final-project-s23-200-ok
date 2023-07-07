import { Router } from "express";
import {
  createProfile,
  getProfileNoId,
  getProfile,
  updateProfileNoId,
  updateProfile,
  deleteProfile,
  linkValorant,
  linkOverwatch
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(protect, createProfile).get(protect, getProfileNoId).put(protect, updateProfileNoId);
//router.route("/:id").get(protect, getProfile).put(protect, updateProfile).delete(protect, deleteProfile);
router.route("/:id/games/valorant").post(protect, linkValorant);
router.route("/:id/games/overwatch").post(protect, linkOverwatch);

export default router;
