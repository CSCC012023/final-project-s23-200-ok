import asyncHandler from "express-async-handler";

import Profile from '../models/Profile.js'
//@route  POST api/profile
//@desc   [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const createProfile = asyncHandler(async (req, res) => {});

//@route   GET api/profile
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getProfile = asyncHandler(async (req, res) => {
    try {
        postMessage.find({}).then(data => {
            res.json(data)
        }).catch(error => {
            res.status(408).json({ msg: error.message })
        })
    }catch(error){
        res.json({error})
    }
});

//@route PUT api/profile/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const updateProfile = asyncHandler(async (req, res) => {
    const body = req.body;
    try {
        const newImage = await Profile.create(body)
        newImage.save();
        res.status(201).json({msg : "New image uploaded...!"})
    } catch {
        res.status(409).json({msg : error.message})
    }
});

//@route DELETE api/profile/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const deleteProfile = asyncHandler(async (req, res) => {});



export { createProfile, getProfile, updateProfile, deleteProfile };
