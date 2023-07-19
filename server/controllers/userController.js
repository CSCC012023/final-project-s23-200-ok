import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";
import LFGPost from "../models/LFGPost.js";

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
  try {
    const user = await User.create({
      userName: userName,
      email: email,
      password: hashedPassword,
    });

    if (user) {
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
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Error while creating user");
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
    //await Profile.deleteOne({ user_id: req.params.id }) add this profile delete after logging out the user so not here
    await user.deleteOne({ _id: req.params.id });
    res.json({ message: "User has been deleted." });
  } else { // user not available
    res.status(404);
    throw new Error("User not found");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30000s",
  });
};

export { registerUser, loginUser, getUsers, getUser, updateUser, deleteUser };
