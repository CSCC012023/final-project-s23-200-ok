import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; 
import mailgen from "mailgen";

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
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD
      }
    }

    // transporter to send mail 
    let transporter = nodemailer.createTransport(config); 
    let MailGenerator = new mailgen({
      theme: "default",
      product : {
        name: "Playbook",
        link: "http://localhost:3000"
      }
    })

    let response = { 
      body: {
        name: user.userName, 
        intro: 'Welcome to Playbook! We\'re very excited to have you on board.',
          action: {
              instructions: 'To get started with Playbook, please click here:',
              button: {
                  color: '#22BC66', // action button color
                  text: 'Verify Your Account',
                  link: "http://localhost:3000/verify/"+user._id,
              }
          },
          outro: 'Happy Gaming.'
        
      }
    }
    let mail = MailGenerator.generate(response); 

    let message = {
      from: "lovelyasunaa@gmail.com",
      to: user.email,
      subject: "Playbook Verification Link", 
      text: "Welcome to Playbook. Please verify your account by clicking link below. Happy Gaming.",
      html: mail,
    }

    try {
      transporter.sendMail(message);

    } catch( error ) {
      console.log(error)
    }
    if (user.isverified===false) {
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

  if (user.isverified===false) {
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
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getUsers = asyncHandler(async (req, res) => {});

//@route   GET api/users/:id
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getUser = asyncHandler(async (req, res) => {});

//@route PUT api/users/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const updateUser = asyncHandler(async (req, res) => {});

//@route DELETE api/users/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const deleteUser = asyncHandler(async (req, res) => {});

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isverified = true;
  await user.save(); 
  res.status(200); 
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30000s",
  });
};

export { registerUser, loginUser, getUsers, getUser, updateUser, deleteUser, verifyEmail };
