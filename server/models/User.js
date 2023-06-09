import mongoose from "mongoose";

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
  profiles: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  lfgposts: [{ type: mongoose.Schema.Types.ObjectId, ref: "LFGPost" }],
  picture: { type: String },
});

const User = mongoose.model("User", UserSchema);
export default User;
