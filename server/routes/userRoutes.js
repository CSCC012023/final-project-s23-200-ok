import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/login").post(loginUser);

export default router;
