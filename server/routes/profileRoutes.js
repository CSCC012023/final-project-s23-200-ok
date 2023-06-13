import { Router } from "express";
import { createProfile, getProfile, updateProfile, deleteProfile } from "../controllers/profileController";

const router = Router();

router.route("/api/profile").post(createProfile).get(getProfile);
router.route("/api/profile/:id").put(updateProfile).delete(deleteProfile);

export default router;
