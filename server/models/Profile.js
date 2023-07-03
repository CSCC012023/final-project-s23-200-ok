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
  bio: { 
    type: String,
    required: false,
    minlength: 1,
    maxlength: 1000,
    default: "I love gaming!"
  },
  profilePicture: { 
    type: String,
    required: false,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  },
  location: { 
    type: String,
    required: false,
    minlength: 1,
    maxlength: 1000,
    default: "Earth"
  },
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
