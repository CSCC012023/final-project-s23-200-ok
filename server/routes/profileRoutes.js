import { Router } from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";

const router = Router();

// router.get("/", (req, res) => {
//   // Send a simple JSON response
//   res.json({ message: "Hello, this is a simple response!" });
// });

router.route("/").post(createProfile).get(getProfile);
router.route("/:id").put(updateProfile).delete(deleteProfile);

export default router;
