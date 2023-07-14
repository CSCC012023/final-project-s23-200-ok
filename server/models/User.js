import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  userName: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  friends: {
    type: [FriendSchema]
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  lfgposts: [{ type: mongoose.Schema.Types.ObjectId, ref: "LFGPost" }],
  picture: { type: String },
});

const User = mongoose.model("User", UserSchema);
export default User;
