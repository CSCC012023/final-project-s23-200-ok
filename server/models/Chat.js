import e from "cors";
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  user_ids_names: [
    {
      user_id: { type: String, required: true },
      user_name: { type: String, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
