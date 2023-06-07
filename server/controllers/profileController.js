import asyncHandler from "express-async-handler";
import axios from "axios";
import Profile from "../models/Profile.js";

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

//@route POST api/profile/:id/games/valorant
//@desc  Link valorant account to profile
//@access Private
const linkValorant = asyncHandler(async (req, res) => {
  const { username, tagline, region } = req.body;
  const id = req.params.id;

  // validate all fields
  if (!username) {
    return res.status(400).json({ msg: "Username is required" });
  }
  if (!tagline) {
    return res.status(400).json({ msg: "Tagline is required" });
  }
  if (!region) {
    return res.status(400).json({ msg: "Region is required" });
  }
  if (region !== "na" && region !== "eu" && region !== "ap") {
    return res.status(400).json({ msg: "Invalid region" });
  }

  try {
    // Check if profile exists
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Check if valorant account exists
    const response = await axios.get(
      `https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${username}/${tagline}`
    );
    if (response.status !== 200) {
      return res.status(400).json({ msg: "Invalid username or tagline" });
    }

    // get valorant data
    const valorantData = response.data.data;

    profile.games.Valorant.ign = valorantData.name + "#" + valorantData.tag;
    profile.games.Valorant.rank = valorantData.current_data.currenttierpatched;
    //TODO: Add stats calculation
    await profile.save();

    return res.status(200).json({ msg: "Valorant account linked" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

//@route POST api/profile/:id/games/valorant
//@desc  Link Overwatch account to profile
//@access Private
const linkOverwatch = asyncHandler(async (req, res) => {});

const test = asyncHandler(async (req, res) => {
  const newProfile = new Profile({
    user: "60cff642f8a2b117d6999a00", // Replace this with a valid ObjectId from your User collection
    bio: "This is a test bio",
    backgroundPicture: "https://example.com/background.jpg",
    location: "Toronto, Canada",
    games: {
      LeagueOfLegends: {
        ign: "testIGN1",
        rank: "Gold",
        stats: ["Stat1", "Stat2"],
      },
      Valorant: {
        ign: "",
        rank: "",
        stats: [],
      },
      Overwatch: {
        ign: "",
        rank: "",
        stats: [],
      },
      Csgo: {
        ign: "",
        rank: "",
        stats: [],
      },
    },
    socials: ["https://facebook.com", "https://twitter.com"],
  });

  await newProfile.save();
  res.json(newProfile);
});

export {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  linkValorant,
  test,
};
