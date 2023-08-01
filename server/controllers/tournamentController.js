import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import User from "../models/User.js";
import Tournament from "../models/Tournament.js";

const createRandomTeamName = () => {
  const adjectives = [
    "Adorable",
    "Blue",
    "Cute",
    "Delightful",
    "Elegant",
    "Fancy",
    "Gentle",
    "Happy",
    "Important",
    "Jolly",
    "Kind",
    "Lively",
    "Mushy",
    "Nice",
    "Obedient",
    "Polite",
    "Questionable",
    "Red",
    "Small",
    "Tall",
    "Unusual",
    "Vast",
    "Wide",
    "Xanthic",
    "Yellow",
    "Zany",
  ];

  const nouns = [
    "Ants",
    "Bats",
    "Cats",
    "Dogs",
    "Elephants",
    "Frogs",
    "Giraffes",
    "Horses",
    "Iguanas",
    "Jaguars",
    "Kangaroos",
    "Lions",
    "Monkeys",
    "Newts",
    "Owls",
    "Penguins",
    "Quails",
    "Rabbits",
    "Snakes",
    "Tigers",
    "Unicorns",
    "Vultures",
    "Wolves",
    "Xerus",
    "Yaks",
    "Zebras",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
};

//@route  POST api/tournament
//@desc   create a tournament
//@access Private
const createTournament = asyncHandler(async (req, res) => {
  //genereate 4 random team names
  let teams = [];
  for (let i = 0; i < 4; i++) {
    const teamName = createRandomTeamName();
    teams.push(teamName);
  }

  let tournament = new Tournament({
    name: req.body.tournamentName,
    admin_user_id: req.user._id,
    admin_user_name: req.user.userName,
  });

  for (let i = 0; i < 4; i++) {
    tournament.semifinals.push({
      name: teams[i],
    });
  }

  tournament = await tournament.save();
  if (!tournament) {
    res.status(400);
    throw new Error("Invalid tournament data");
  }

  res.status(201).json(tournament);
});

//@route  GET api/tournament/:id
//@desc   get a tournament by id
//@access Private
const getTournamentById = asyncHandler(async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);

  if (!tournament) {
    res.status(404);
    throw new Error("Tournament not found");
  }

  res.status(200).json(tournament);
});

//@route  GET api/tournament
//@desc   get all tournaments
//@access Private
const getAllTournaments = asyncHandler(async (req, res) => {
  const tournaments = await Tournament.find({});

  if (!tournaments) {
    res.status(404);
    throw new Error("Tournaments not found");
  }

  res.status(200).json(tournaments);
});

//@route  PATCH api/tournament/:id
//@desc   update a tournament by id as the admin
//@access Private
const updateTournamentById = asyncHandler(async (req, res) => {
  const { started, semifinals, finals, winner } = req.body;

  const tournament = await Tournament.findById(req.params.id);

  if (!tournament) {
    res.status(404);
    throw new Error("Tournament not found");
  }

  // Only allow the admin to update the tournament (not any logged in user)
  if (req.user._id !== tournament.admin_user_id) {
    res.status(403);
    throw new Error("You do not have permission to update this tournament");
  }

  // Validate data
  if (!started || !semifinals || !finals || !winner) {
    res.status(400);
    throw new Error("Missing field(s)");
  }

  tournament.started = started;
  tournament.semifinals = semifinals;
  tournament.finals = finals;
  tournament.winner = winner;
  await tournament.save();

  res.status(200).json(tournament);
});

//@route  DELETE api/tournament/:id
//@desc   delete a tournament by id as the admin
//@access Private

//@route  POST api/tournament/:id
//@desc   add a participant to a team in a tournament
//@access Private
const addParticipantToTeam = asyncHandler(async (req, res) => {
  const { teamId } = req.body;
  const { _id, userName, profilePicture } = req.user;

  const tournament = await Tournament.findById(req.params.id);

  if (!tournament) return res.status(404).json("Tournament not found");
  if (tournament.started)
    return res.status(403).json("Tournament has already started");

  // Find the index of the team that the participant is being added to
  const teamIndex = tournament.semifinals.findIndex(
    (team) => team._id.toString() === teamId
  );

  if (teamIndex === -1) return res.status(404).json("Team not found");

  // Check if the participant is already in the team
  const participantIndex = tournament.semifinals[
    teamIndex
  ].teamMembers.findIndex(
    (participant) => participant.user_id === _id.toString()
  );

  if (participantIndex !== -1)
    return res.status(400).json("Participant is already in the team");

  // Check if the team is full
  if (tournament.semifinals[teamIndex].teamMembers.length === 5)
    return res.status(400).json("Team is full");

  // check if the participant is already in another team, if so, remove them from that team
  for (let i = 0; i < tournament.semifinals.length; i++) {
    const participantIndex = tournament.semifinals[i].teamMembers.findIndex(
      (participant) => participant.user_id === _id.toString()
    );
    if (participantIndex !== -1) {
      tournament.semifinals[i].teamMembers.splice(participantIndex, 1);
    }
  }

  // Add the participant to the team
  tournament.semifinals[teamIndex].teamMembers.push({
    user_id: _id,
    userName,
    profilePicture,
  });

  await tournament.save();
  res.status(200).json(tournament);
});

//@route  DELETE api/tournament/:id
//@desc   participant leaves a tournament
//@access Private
const leaveTournament = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const tournament = await Tournament.findById(req.params.id);

  if (!tournament) return res.status(404).json("Tournament not found");

  // check if the participant is already in another team, if so, remove them from that team
  for (let i = 0; i < tournament.semifinals.length; i++) {
    const participantIndex = tournament.semifinals[i].teamMembers.findIndex(
      (participant) => participant.user_id === _id.toString()
    );
    if (participantIndex !== -1) {
      tournament.semifinals[i].teamMembers.splice(participantIndex, 1);
    }
  }

  await tournament.save();
  res.status(200).json(tournament);
});

export { createTournament, addParticipantToTeam, leaveTournament };
