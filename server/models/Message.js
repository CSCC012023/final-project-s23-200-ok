import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  message: { type: String, required: true },
  sender_user_id: { type: String, required: true },
  sender_user_name: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
