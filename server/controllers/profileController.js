import asyncHandler from "express-async-handler";
import Profile from "../models/Profile.js";

//@route  POST api/profile
//@desc   [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const createProfile = asyncHandler(async (req, res) => {
    const { user, bio, backgroundPicture, location, games, socials } = req.body

    const profile = new Profile({
        user,
        bio,
        backgroundPicture,
        location,
        games,
        socials
    })
    try {
        // Save the profile to the database
        const createdProfile = await profile.save();
    
        // Send the created profile as the response
        res.status(201).json(createdProfile);
      } catch (error) {
        // Handle any errors that occur during the creation process
        res.status(500).json({ message: "Profile creation failed", error: error.message });
      }
});

//@route   GET api/profile
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getProfile = asyncHandler(async (req, res) => {});

//@route PUT api/profile/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const updateProfile = asyncHandler(async (req, res) => {
    
    
});


//@route DELETE api/profile/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const deleteProfile = asyncHandler(async (req, res) => {});

export { createProfile, getProfile, updateProfile, deleteProfile };
