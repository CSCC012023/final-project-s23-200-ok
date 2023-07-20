import asyncHandler from "express-async-handler";
import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";
import Profile from "../models/Profile.js";

//@route POST api/friendrequests/:recipientUserId
//@desc Create (send) a friend request
//@access Private
const createFriendRequest = asyncHandler(async (req, res) => {

  // VALIDATE RECIPIENT

  // No such recipient
  const recipient = await User.findById(req.params.recipientUserId);
  if (!recipient) {
    res.status(404);
    throw new Error("Recipient not found");
  }

  // Recipient already friend or is the sender themselves
  // User id set in authentication middleware
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
    sender_user_id: sender._id,
    sender_userName: sender.userName,
    recipient_user_id: recipient._id,
    recipient_userName: recipient.userName
  });
  if (existingFriendRequest && existingFriendRequest.status === "pending") {
    res.status(400);
    throw new Error("Cannot send another friend request to this recipient");
  }

  // Incoming friend request from desired recipient
  const incomingFriendRequest = await FriendRequest.findOne({
    sender_user_id: recipient._id,
    sender_userName: recipient.userName,
    recipient_user_id: sender._id,
    recipient_userName: sender.userName
  });
  if (incomingFriendRequest && incomingFriendRequest.status === "pending") {
    res.status(400);
    throw new Error("Respond to request from this recipient first");
  }

  // Create friend request
  const sender_profilePicture = (await Profile.findOne({ user_id: sender._id })).profilePicture;
  const recipient_profilePicture = (await Profile.findOne({ user_id: recipient._id })).profilePicture;

  const friendRequest = await FriendRequest.create({
    // User id and userName set in authentication middleware
    sender_user_id: req.user._id,
    sender_userName: req.user.userName,
    sender_profilePicture: sender_profilePicture,
    recipient_user_id: recipient._id,
    recipient_userName: recipient.userName,
    recipient_profilePicture: recipient_profilePicture
  });

  if (friendRequest) {
    res.status(201).json(friendRequest);
  }
  else {
    res.status(400);
    throw new Error("Invalid friend request data");
  }
});

//@route PATCH api/friendrequests/:friendRequestId
//@desc Respond to a friend request, befriend if accepted
//@access Private
const respondToFriendRequest = asyncHandler(async (req, res) => {
  const { newStatus } = req.body;
  const friendRequest = await FriendRequest.findById(req.params.friendRequestId);

  if (!friendRequest) {
    res.status(404);
    throw new Error("Friend request not found");
  }

  // Only allow the recipient to respond to the request (not any logged in user)
  // User id set in authentication middleware
  if (req.user._id.toString() !== friendRequest.recipient_user_id) {
    res.status(403);
    throw new Error("You do not have permission to respond to this friend request");
  }

  // Validate data
  if (!newStatus) {
    res.status(400);
    throw new Error("Missing field(s)");
}

  // Update friend request status
  try {
    friendRequest.status = newStatus;
    await friendRequest.save();
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400);
      throw new Error("Invalid new status");
    }
    res.status(500);
    throw new Error("Error while responding to friend request");
  }

  // If accepted, add recipient to sender's friends array and vice versa
  if (newStatus === "accepted") {
    const sender = await User.findById(friendRequest.sender_user_id);
    const recipient = await User.findById(friendRequest.recipient_user_id);

    sender.friends.push({
      user_id: recipient._id,
      userName: recipient.userName,
      profilePicture: friendRequest.recipient_profilePicture
    });

    recipient.friends.push({
      user_id: sender._id,
      userName: sender.userName,
      profilePicture: friendRequest.sender_profilePicture
    });

    await sender.save();
    await recipient.save();
  }
  res.status(200).json(friendRequest);
});

//@route GET api/friendrequests/incoming
//@desc Get all incoming friend requests
//@access Private
const getIncomingFriendRequests = asyncHandler(async (req, res) => {
  // User id set in authentication middleware
  const incomingFriendRequests = await FriendRequest.find({ recipient_user_id: req.user._id });

  res.status(200).json(incomingFriendRequests);
});

//@route GET api/friendrequests/outgoing
//@desc Get all outgoing friend requests
//@access Private
const getOutgoingFriendRequests = asyncHandler(async (req, res) => {
  // User id set in authentication middleware
  const outgoingFriendRequests = await FriendRequest.find({ sender_user_id: req.user._id });

  res.status(200).json(outgoingFriendRequests);
});

//@route DELETE api/friendrequests/:friendRequestId
//@desc Delete (cancel) a friend request
//@access Private
const deleteFriendRequest = asyncHandler(async (req, res) => {
  const friendRequest = await FriendRequest.findById(req.params.friendRequestId);

  if (!friendRequest) {
    res.status(404);
    throw new Error("Friend request not found");
  }

  // Only allow the sender to delete/cancel the request (not any logged in user)
  // User id set in authentication middleware
  if (req.user._id.toString() !== friendRequest.sender_user_id) {
    res.status(403);
    throw new Error("You do not have permission to cancel this friend request");
  }

  // Friend request cannot be cancelled once it's been accepted/rejected
  if (friendRequest.status !== "pending") {
    res.status(400);
    throw new Error("You can no longer cancel this friend request");
  }

  await friendRequest.deleteOne();
  res.status(200).json({ "_id": req.params.friendRequestId });
});

export {
  createFriendRequest,
  respondToFriendRequest,
  getIncomingFriendRequests,
  getOutgoingFriendRequests,
  deleteFriendRequest
};