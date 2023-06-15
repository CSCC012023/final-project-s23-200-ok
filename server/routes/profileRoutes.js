import { Router } from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";

const router = Router();

router.route("/").post(createProfile).get(getProfile);
router.route("/:id").post(updateProfile).delete(deleteProfile);

export default router;
