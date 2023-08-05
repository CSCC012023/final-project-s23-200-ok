import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  userName: { type: String, required: true },
  profilePicture: {
    type: String,
    required: false,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
});

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  teamMembers: {
    type: [ParticipantSchema],
    default: [],
    length: 5,
  },
});

const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  admin_user_id: {
    type: String,
    required: true,
  },
  admin_user_name: {
    type: String,
    required: true,
  },
  semifinals: {
    type: [TeamSchema],
    length: 4,
    required: true,
  },
  finals: {
    type: [TeamSchema],
    length: 2,
    required: false,
  },
  winner: {
    type: TeamSchema,
    required: false,
  },
  participants: {
    type: [ParticipantSchema],
    required: false,
    default: [],
  },
  started: {
    type: Boolean,
    required: true,
    default: false,
  },
  ended: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Tournament = mongoose.model("Tournament", TournamentSchema);
export default Tournament;
