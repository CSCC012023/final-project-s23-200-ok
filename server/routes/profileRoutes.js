import { Router } from "express";
import {
  createProfile,
  getProfileNoId,
  getProfile,
  updateProfileNoId,
  updateProfile,
  deleteProfile,
  linkValorant,
  linkOverwatch,
  getValStat
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkBlockedUser } from "../middleware/blockUserMiddleware.js";
import { blockUser } from "../controllers/userController.js";

const router = Router();
const blockCheck = await checkBlockedUser('profile');

router.route("/").post(protect, createProfile).get(protect, getProfileNoId).put(protect, updateProfileNoId);
router.route("/:id").delete(protect, deleteProfile);
router.route("/:id/games/valorant").post(protect, linkValorant);
router.route("/:id/games/overwatch").post(protect, linkOverwatch);
router.route("/games/valorant/:region/:username/:tagline/stat").get(getValStat);
router.route("/:user_id").get(protect, getProfile);

export default router;
