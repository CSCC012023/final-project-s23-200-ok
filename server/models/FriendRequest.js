import mongoose from "mongoose";

const FriendRequestSchema = new mongoose.Schema({
  sender_user_id: { type: String, required: true },
  sender_userName: { type: String, required: true },
  recipient_user_id: { type: String, required: true },
  recipient_userName: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
});

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);
export default FriendRequest;