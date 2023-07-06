import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  type: { type: String, required: true, enum: ["text", "image", "video"] },
  content: { type: String, required: true, minlength: 1, maxlength: 1000 },
  fileId: { type: String, required: false},
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  
  date: { type: Date, default: Date.now },




})



const Post = mongoose.model("Post", PostSchema);
export default Post;
