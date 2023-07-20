import mongoose from "mongoose";

const FriendRequestSchema = new mongoose.Schema({
  sender_user_id: { type: String, required: true },
  sender_userName: { type: String, required: true },
  sender_profilePicture: { 
    type: String,
    required: false,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  },
  recipient_user_id: { type: String, required: true },
  recipient_userName: { type: String, required: true },
  recipient_profilePicture: { 
    type: String,
    required: false,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
});

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);
export default FriendRequest;