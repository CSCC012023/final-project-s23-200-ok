import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  type: { type: String, required: true, enum: ["text", "image", "video"] },
  content: { type: String, required: true, minlength: 1, maxlength: 1000 },
  imageUrl: { type: String, required: false, minlength: 1, maxlength: 1000 },
  videoUrl: { type: String, required: false, minlength: 1, maxlength: 1000 },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      reaction: {
        type: String,
        enum: ['like', 'heart', 'laugh', 'fire', 'sad', 'skull'],
        required: true,
      },
    },
  ],
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
