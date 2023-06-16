import { Router } from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  linkValorant,
  linkOverwatch,
  test,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(createProfile);
router.route("/test").get(test);
router.route("/:id").get(getProfile);
router.route("/:id").put(updateProfile).delete(deleteProfile);
router.route("/:id/games/valorant").post(linkValorant);
router.route("/:id/games/overwatch").post(linkOverwatch);

//router.route("/").post(protect, createProfile).get(protect, getProfile);
// router.route("/:id").put(protect, updateProfile).delete(protect, deleteProfile);

export default router;
