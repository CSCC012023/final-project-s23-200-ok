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
  blockUser,
  getBlockedUsers,
  deleteUser,
  verifyEmail,
  resetPassword,
  sendResetPasswordEmail,
  getFriendsWithId,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkBlockedUser } from "../middleware/blockUserMiddleware.js";

const router = Router();
const blockCheck = await checkBlockedUser('profile');

router.route("/").post(registerUser).get(protect, getUsers);
router.route("/resetpassword/:id").post(resetPassword);
router.route("/verify/:id").get(verifyEmail);
router.route("/block").get(protect, getBlockedUsers);
router.route("/block/:userId").patch(protect, blockUser);
router.route("/forgotpassword").post(sendResetPasswordEmail);
router.route("/login").post(loginUser);
router.route("/nonfriends").get(protect, getNonFriendUsers);
router.route("/friends").get(protect, getFriends);
router.route("/friends/:id").get(protect, getFriendsWithId);
router.route("/:friendUserId").patch(protect, unfriendFriend);
router
  .route("/:id")
  .get(protect, blockCheck, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

export default router;
