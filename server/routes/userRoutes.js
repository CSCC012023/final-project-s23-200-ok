import { Router } from "express";
import {
  registerUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
