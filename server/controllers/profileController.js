import asyncHandler from "express-async-handler";
import axios from "axios";
import Profile from "../models/Profile.js";

//@route  POST api/profile
//@desc   [DESCRIPTION OF WHAT ROUTE DOES]
//@access Private
const createProfile = asyncHandler(async (req, res) => {
  // Check if this user already has a profile
  const userHasProfile = await Profile.findOne({ user_id: req.user._id });
  
  if (userHasProfile) {
    res.status(400);
    throw new Error("User already has a profile");
  }

  // Create profile
  try {
    const profile = await Profile.create({
      // User id and userName set in authentication middleware
      user_id: req.user._id,
      userName: req.user.userName
    });

    if (profile) {
      res.status(201).json(profile);
    } 
    else {
      res.status(400);
      throw new Error("Invalid profile data");
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Error while creating profile");
  }
});

//@route   GET api/profile/
//@desc    get profile WITHOUT id (assume there's only 1 per user)
//@access  Private
const getProfileNoId = asyncHandler(async (req, res) => {
  try {
    // User id set in authentication middleware
    const profile = await Profile.findOne({ user_id: req.user._id });

    if (profile) {
      res.status(200).json(profile);
    }
    else {
      res.status(400);
      throw new Error("Invalid user");
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

//@route   GET api/profile/:id
//@desc    get profile by id
//@access  Public
const getProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    // Check if profile exists
    let profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

//@route   PUT api/profile/
//@desc    update profile WITHOUT id (assume there's only 1 per user)
//@access  Private
const updateProfileNoId = asyncHandler(async (req, res) => {
  try {
    // User id set in authentication middleware
    const profile = await Profile.findOne({ user_id: req.user._id });
    if (profile) {
      // Don't allow user to update user_id or userName
      const { bio, profilePicture, location, games, socials } = req.body;
      
      // Update profile
      profile.bio = bio;
      profile.profilePicture = profilePicture;
      profile.location = location;
      profile.games = games;
      profile.socials = socials;
      await profile.save();
      
      res.status(200).json(profile);
    }
    else {
      res.status(400);
      throw new Error("Invalid user");
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

//@route PUT api/profile/:id
//@desc  Takes in updated profile data and updates it
//@access Public
const updateProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { bio, profilePicture, name, socials, games } = req.body;
  try {
    let profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    // update profile
    profile.bio = bio;
    profile.profilePicture = profilePicture;
    profile.name = name;
    profile.socials = socials;
    profile.games = games;

    await profile.save();

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

//@route DELETE api/profile/:id
//@desc  Delete user profile
//@access Private
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

    const valorantGame = profile.games.find((game) => game.name === "Valorant");
    if (valorantGame) {
      valorantGame.ign = valorantData.name + "#" + valorantData.tag;
      valorantGame.rank = valorantData.current_data.currenttierpatched;
      // TODO: Add stats calculation
    }
    await profile.save();

    return res.status(200).json({ msg: "Valorant account linked" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

//@route POST api/profile/:id/games/overwatch
//@desc  Link Overwatch account to profile
//@access Private
const linkOverwatch = asyncHandler(async (req, res) => {
  const { username, tagline, region, platform } = req.body;
  const id = req.params.id;

  const overwatchRankMap = {
    Bronze: 1,
    Silver: 2,
    Gold: 3,
    Platinum: 4,
    Diamond: 5,
    Master: 6,
    Grandmaster: 7,
    "Top 500": 8,
  };

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
  if (region !== "us" && region !== "eu" && region !== "asia") {
    return res.status(400).json({ msg: "Invalid region" });
  }
  if (!platform) {
    return res.status(400).json({ msg: "Platform is required" });
  }
  if (platform !== "pc" && platform !== "xbl" && platform !== "psn") {
    return res.status(400).json({ msg: "Invalid platform" });
  }

  const battletag = username + "-" + tagline;

  try {
    // Check if profile exists
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Check if overwatch account exists
    const response = await axios.get(
      `https://ow-api.com/v1/stats/${platform}/${region}/${battletag}/profile`
    );
    if (response.status !== 200) {
      return res
        .status(400)
        .json({ msg: "Invalid username, tagline, region, or platform" });
    }

    // get overwatch data
    const overwatchData = response.data;

    let highestRank = 0;
    let highestRole = {};

    for (const role of overwatchData.ratings) {
      const rank = overwatchRankMap[role.group] * 100 + role.tier;
      if (rank > highestRank) {
        highestRank = rank;
        highestRole = role;
      }
    }

    const overwatchGame = profile.games.find(
      (game) => game.name === "Overwatch"
    );
    if (overwatchGame) {
      overwatchGame.ign = overwatchData.name + "#" + tagline;
      overwatchGame.rank = highestRole.group + " " + highestRole.tier;
      // TODO: Add stats calculation
    }
    await profile.save();

    return res.status(200).json({ msg: "Overwatch account linked" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

export {
  createProfile,
  getProfileNoId,
  getProfile,
  updateProfileNoId,
  updateProfile,
  deleteProfile,
  linkValorant,
  linkOverwatch
};
