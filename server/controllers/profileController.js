import asyncHandler from "express-async-handler";

//@route  POST api/profile
//@desc   [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const createProfile = asyncHandler(async (req, res) => {});

//@route   GET api/profile
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getProfile = asyncHandler(async (req, res) => {});

//@route PUT api/profile/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const updateProfile = asyncHandler(async (req, res) => {});

//@route DELETE api/profile/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const deleteProfile = asyncHandler(async (req, res) => {});

export { createProfile, getProfile, updateProfile, deleteProfile };
