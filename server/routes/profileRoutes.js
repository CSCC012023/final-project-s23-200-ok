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

const router = Router();

router.route("/").post(createProfile);
router.route("/test").get(test);
router.route("/:id").get(getProfile);
router.route("/:id").put(updateProfile).delete(deleteProfile);
router.route("/:id/games/valorant").post(linkValorant);
router.route("/:id/games/overwatch").post(linkOverwatch);

export default router;
