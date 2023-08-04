import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getNonFriendUsers,
  getUser,
  updateUser,
  getFriends,
  unfriendFriend,
  deleteUser,
  verifyEmail,
  resetPassword,
  sendResetPasswordEmail,
  getFriendsWithId,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(registerUser).get(protect, getUsers);
router.route("/resetpassword/:id").post(resetPassword);
router.route("/verify/:id").get(verifyEmail);
router.route("/forgotpassword").post(sendResetPasswordEmail);
router.route("/login").post(loginUser);
router.route("/nonfriends").get(protect, getNonFriendUsers);
router.route("/friends").get(protect, getFriends);
router.route("/friends/:id").get(protect, getFriendsWithId);
router.route("/:friendUserId").patch(protect, unfriendFriend);
router
  .route("/:id")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

export default router;
