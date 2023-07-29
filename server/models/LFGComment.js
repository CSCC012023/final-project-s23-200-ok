import mongoose from "mongoose";

const LFGCommentSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  userName: { type: String, required: true, minlength: 1, maxlength: 100 },
  post_id: { type: String, required: true},
  parent_comment_id: { type: String, required: true },
  date: { type: Date, default: Date.now },
  text: { type: String, required: true, minlength: 1, maxlength: 1000 },
});

const LFGComment = mongoose.model("LFGComment", LFGCommentSchema);
export default LFGComment;