import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  getFriends,
  unfriendFriend,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(registerUser).get(protect, getUsers);
router.route("/login").post(loginUser);
router.route("/friends").get(protect, getFriends);
router.route("/:friendUserId").patch(protect, unfriendFriend);
router.route("/:id")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

export default router;
