import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.route("/").post(createUser).get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
