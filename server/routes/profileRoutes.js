import { Router } from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  linkValorant,
  test,
} from "../controllers/profileController.js";

const router = Router();

router.route("/").post(createProfile).get(getProfile);
router.route("/:id").put(updateProfile).delete(deleteProfile);
router.route("/:id/games/valorant").post(linkValorant);
router.route("/test").get(test);

export default router;
