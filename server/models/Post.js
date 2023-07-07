import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  userName: { type: String, required: true, minlength: 1, maxlength: 100 },
  text: { type: String, required: true, minlength: 1, maxlength: 1000 },
  image: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
