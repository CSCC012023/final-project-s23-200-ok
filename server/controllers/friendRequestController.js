import asyncHandler from "express-async-handler";
import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

//@route POST api/friendrequests
//@desc Create a new friend request
//@access Private
const createFriendRequest = asyncHandler(async (req, res) => {

  // VALIDATE RECIPIENT

  // No such recipient
  const recipient = await User.findById(req.params.id);
  if (!recipient) {
    res.status(404);
    throw new Error("Recipient not found");
  }

  // Recipient already friend or is the sender themselves
  const sender = await User.findById(req.user._id);
  if (sender._id.toString() === recipient._id.toString()
    || sender.friends.some(friend => {
      return friend.user_id === recipient._id.toString() && friend.userName === recipient.userName
    })) {
    res.status(400);
    throw new Error("Invalid recipient");
  }

  // Duplicate friend request
  const existingFriendRequest = await FriendRequest.findOne({
    recipient_user_id: recipient._id,
    recipient_userName: recipient.userName
  });
  if (existingFriendRequest && existingFriendRequest.status !== "rejected") {
    res.status(400);
    throw new Error("Cannot send another friend request to this recipient");
  }

  // Create friend request
  const friendRequest = await FriendRequest.create({
    // User id and userName set in authentication middleware
    sender_user_id: req.user._id,
    sender_userName: req.user.userName,
    recipient_user_id: recipient._id,
    recipient_userName: recipient.userName
  });

  if (friendRequest) {
    res.status(201).json(friendRequest);
  }
  else {
    res.status(400);
    throw new Error("Invalid friend request data");
  }
});

export {
  createFriendRequest
};
