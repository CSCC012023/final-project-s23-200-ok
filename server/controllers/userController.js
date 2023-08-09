import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import mailgen from "mailgen";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";
import LFGPost from "../models/LFGPost.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

//@route  POST api/users
//@desc   [DESCRIPTION OF WHAT ROUTE DOES]
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  // Destructure user data
  const { userName, email, password } = req.body;

  // Validate user data
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if the username or email are already being used
  const userNameExists = await User.findOne({ userName });
  const emailExists = await User.findOne({ email });

  if (userNameExists) {
    res.status(400);
    throw new Error("Username taken");
  }
  if (emailExists) {
    res.status(400);
    throw new Error("This email is already registered");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    userName: userName,
    email: email,
    password: hashedPassword,
  });

  if (user) {
    // email verification config
    let config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };

    // transporter to send mail
    let transporter = nodemailer.createTransport(config);
    let MailGenerator = new mailgen({
      theme: "default",
      product: {
        name: "Playbook",
        link: "http://localhost:3000",
      },
    });

    let response = {
      body: {
        name: user.userName,
        intro: "Welcome to Playbook! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Playbook, please click here:",
          button: {
            color: "#22BC66", // action button color
            text: "Verify Your Account",
            link: "http://localhost:3000/verify/" + user._id,
          },
        },
        outro: "Happy Gaming.",
      },
    };
    let mail = MailGenerator.generate(response);

    let message = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Playbook Verification Link",
      text: "Welcome to Playbook. Please verify your account by clicking link below. Happy Gaming.",
      html: mail,
    };

    try {
      transporter.sendMail(message);
    } catch (error) {
      console.log(error);
    }
    if (user.isverified === false) {
      res.status(403);
      throw new Error("Email not verified");
    }

    res.status(201).json({
      _id: user.id, // "id" is the string version of "_id"
      userName: user.userName,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@route   POST /login
//@desc    Authenticates the user
//@access  Public
const loginUser = asyncHandler(async (req, res) => {
  // Destructure user credentials
  const { email, password } = req.body;

  // Validate user entered all fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  // Check for user email
  const user = await User.findOne({ email });

  // If user exists and password is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    // Check if email verified
    if (user.isverified === false) {
      res.status(403);
      throw new Error("Email not verified");
    }

    res.status(200).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user.id),
      chatAlert: user.chatalert,
      blockedUsers: user.blockedUsers,
      blockedBy: user.blockedBy,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@route   GET api/users
//@desc    Get all users
//@access  Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

//@route   GET api/users/nonfriends
//@desc    Get all non friend users
//@access  Private
const getNonFriendUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  // User id set in authentication middleware
  const loggedInUser = await User.findById(req.user._id);

  res.status(200).json(
    users.filter((user) => {
      return (
        // don't include logged in user
        user._id.toString() !== loggedInUser._id.toString() &&
        // don't include logged in user's friends
        !loggedInUser.friends.some((friend) => {
          return (
            friend.user_id === user._id.toString() &&
            friend.userName === user.userName
          );
        })
      );
    })
  );
});

//@route   GET api/users/:id
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getUser = asyncHandler(async (req, res) => {});

//@route PUT api/users/:id
//@desc  set user chat alert to req.body.chatalert
//@access private
const updateUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);
  if (user) {
    user.chatalert = req.body.chatAlert;
    await user.save();
    res.json({
      chatAlert: user.chatalert,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@route   GET api/users/friends
//@desc    Return list of logged in user's friends
//@access  Private
const getFriends = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json(user.friends);
});

//@route GET api/users/friends/:id
//@desc    Return list of user's friends given id
//@access  Private
const getFriendsWithId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    // Check if user exists
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

//@route   GET api/users/blocked
//@desc    Return list of logged in user's blocked users and blocked by users
//@access  Private
const getBlockedUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ blockedUsers:user.blockedUsers, blockedBy:user.blockedBy });
});

//@route   PATCH api/users/:friendUserId
//@desc    Remove friend with user_id friendUserId from logged in user's friends array
//@access  Private
const unfriendFriend = asyncHandler(async (req, res) => {
  console.log("unfriendFriend");
  // No such friend
  const friend = await User.findById(req.params.friendUserId);
  if (!friend) {
    res.status(404);
    throw new Error("Friend not found");
  }

  // User id set in authentication middleware
  const user = await User.findById(req.user._id);

  // delete chats between user and friend
  const chatsToDelete = await Chat.find({
    $and: [
      { "user_ids_names.user_id": user._id.toString() },
      { "user_ids_names.user_id": friend._id.toString() },
    ],
  });

  for (const chat of chatsToDelete) {
    Message.deleteMany({ chat_id: chat._id });
  }

  await Chat.deleteMany({
    $and: [
      { "user_ids_names.user_id": user._id.toString() },
      { "user_ids_names.user_id": friend._id.toString() },
    ],
  });

  user.friends = user.friends.filter(
    (friend) => friend.user_id.toString() !== req.params.friendUserId
  );
  user.save();

  friend.friends = friend.friends.filter(
    (friend) => friend.user_id.toString() !== user._id.toString()
  );
  friend.save();

  console.log("user.friends: ", user.friends);
  res.status(200).json(user.friends);
});

//@route PATCH api/users/block/:userId
//@desc Block or unblock another user
//@access Private
const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const userToBlock = await User.findById(req.params.userId);
  const blockedUserIndex = user.blockedUsers.indexOf(req.params.userId);
  const blockedByIndex = userToBlock.blockedUsers.indexOf(req.user._id);

  // Check if user being blocked/unblocked exists
  if (!userToBlock) {
    res.status(404);
    throw new Error("User not found");
  }

  // Don't allow a user to block self
  if (req.user._id.toString() === req.params.userId) {
    res.status(400);
    throw new Error("Cannot block self");
  }

  // Block or unblock depending on whether target user is already blocked
  try {
    if (blockedUserIndex === -1) {
      user.blockedUsers.push(req.params.userId);
      userToBlock.blockedBy.push(req.user._id);
    }
    else {
      user.blockedUsers.splice(blockedUserIndex, 1);
      userToBlock.blockedBy.splice(blockedByIndex, 1);
    }
  } catch (error) {
    res.status(500);
    throw new Error("An error occurred while blocking user");
  }

  user.save();
  userToBlock.save();
  res.status(200).json({blockedUsers: user.blockedUsers, blockedBy: user.blockedBy});
});

//@route DELETE api/users/:id
//@desc  Deletes the user account
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // the user is authorized to delete it.
  if (user) {
    await Post.deleteMany({ user_id: req.params.id });
    await LFGPost.deleteMany({ user_id: req.params.id });
    await Profile.deleteOne({ user_id: req.params.id });

    const chats = await Chat.find({
      "user_ids_names.user_id": req.params.id,
    });

    for (const chat of chats) {
      await Message.deleteMany({ chat_id: chat._id });
    }

    await Chat.deleteMany({ "user_ids_names.user_id": req.params.id });
    await User.deleteOne({ _id: req.params.id });

    res.json({ message: "User has been deleted." });
  } else {
    // user not available
    res.status(404);
    throw new Error("User not found");
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isverified = true;
  await user.save();
  await createProfileWithUserId(user);
  await res.status(200);
});

const createProfileWithUserId = async (user) => {
  // Check if this user already has a profile
  const userHasProfile = await Profile.findOne({ user_id: user._id });

  if (userHasProfile) {
    throw new Error("User already has a profile");
  }

  // Create profile
  const profile = await Profile.create({
    user_id: user._id,
    userName: user.userName,
  });

  if (profile) {
    return profile;
  } else {
    throw new Error("Creating profile failed");
  }
};

// generate token for jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30000s",
  });
};

const resetPassword = asyncHandler(async (req, res) => {
  // find user from req params id
  const user = await User.findById(req.params.id);
  const { password } = req.body;
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (!password) {
    res.status(400);
    throw new Error("Please enter new password");
  }
  // Update user's password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
});

const sendResetPasswordEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // Check for user email
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Invalid Credentials");
  } else {
    // check if the user is verified first
    // if not, they can't reset their email
    if (user.isverified === false) {
      res.status(403);
      throw new Error("Email not verified");
    }
    // email verification config
    let config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };

    // transporter to send mail
    let transporter = nodemailer.createTransport(config);
    let MailGenerator = new mailgen({
      theme: "default",
      product: {
        name: "Playbook",
        link: "http://localhost:3000",
      },
    });

    let response = {
      body: {
        name: user.userName,
        intro: "Sorry to hear you're having trouble logging in.",
        action: {
          instructions: "To reset your password, please click here:",
          button: {
            color: "#22BC66", // action button color
            text: "Reset Password",
            link: "http://localhost:3000/resetpassword/" + user._id,
          },
        },
        outro: "Happy Gaming.",
      },
    };
    let mail = MailGenerator.generate(response);

    let message = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Reset Your Playbook Password",
      text: "Please reset your password by clicking the link below. Happy Gaming.",
      html: mail,
    };

    try {
      transporter.sendMail(message);
    } catch (error) {
      console.log(error);
    }
    res.status(403);
    throw new Error("Check your email to reset password");
  }
});

export {
  registerUser,
  loginUser,
  getUsers,
  getNonFriendUsers,
  getUser,
  updateUser,
  getFriends,
  getFriendsWithId,
  getBlockedUsers,
  unfriendFriend,
  blockUser,
  deleteUser,
  verifyEmail,
  resetPassword,
  sendResetPasswordEmail,
};
