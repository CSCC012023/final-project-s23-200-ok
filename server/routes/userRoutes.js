import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  verifyEmail
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(registerUser).get(protect, getUsers);
router.route("/verify/:id").get(verifyEmail); 
router.route("/:id")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);
router.route("/login").post(loginUser);

export default router;
