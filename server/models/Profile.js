import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  ign: { type: String, default: "" },
  rank: { type: String, default: "" },
  stats: [{ type: String, default: "" }],
});

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  bio: { type: String, required: false, minlength: 1, maxlength: 1000 },
  profilePic: { type: String, required: false },
  location: { type: String, required: false, minlength: 1, maxlength: 1000 },
  games: {
    type: [gameSchema],
    required: false,
    default: [
      { name: "Valorant", ign: "", rank: "", stats: [] },
      { name: "Overwatch", ign: "", rank: "", stats: [] },
    ],
  },
  socials: [{ type: String, required: false, minlength: 1, maxlength: 1000 }],
});

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
