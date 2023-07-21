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
      from: "lovelyasunaa@gmail.com",
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

  if (user.isverified === false) {
    res.status(403);
    throw new Error("Email not verified");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user.id),
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

//@route   GET api/users/:id
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getUser = asyncHandler(async (req, res) => {});

//@route PUT api/users/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const updateUser = asyncHandler(async (req, res) => {});

//@route   GET api/users/friends
//@desc    Return list of logged in user's friends
//@access  Private
const getFriends = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json(user.friends);
});

//@route   PATCH api/users/:friendUserId
//@desc    Remove friend with user_id friendUserId from logged in user's friends array
//@access  Private
const unfriendFriend = asyncHandler(async (req, res) => {
  // No such friend
  const friend = await User.findById(req.params.friendUserId);
  if (!friend) {
    res.status(404);
    throw new Error("Friend not found");
  }

  const user = await User.findById(req.user._id);
  user.friends = user.friends.filter(
    (friend) => friend.user_id.toString() !== req.params.friendUserId
  );
  user.save();

  friend.friends = friend.friends.filter(
    (friend) => friend.user_id.toString() !== user._id.toString()
  );
  friend.save();

  res.status(200).json(user.friends);
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

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30000s",
  });
};

const createProfileWithUserId = async (user) => {
  console.log("createProfileWithUserId");
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

export {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  getFriends,
  unfriendFriend,
  deleteUser,
  verifyEmail,
};
