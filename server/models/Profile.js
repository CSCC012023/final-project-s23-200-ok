import mongoose from "mongoose";

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
    LeagueOfLegends: {
      ign: { type: String, default: "" },
      rank: { type: String, default: "" },
      stats: [{ type: String, default: "" }],
    },
    Valorant: {
      ign: { type: String, default: "" },
      rank: { type: String, default: "" },
      stats: [{ type: String, default: "" }],
    },
    Overwatch: {
      ign: { type: String, default: "" },
      rank: { type: String, default: "" },
      stats: [{ type: String, default: "" }],
    },
    Csgo: {
      ign: { type: String, default: "" },
      rank: { type: String, default: "" },
      stats: [{ type: String, default: "" }],
    },
  },
  socials: [{ type: String, required: false, minlength: 1, maxlength: 1000 }],
});

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
