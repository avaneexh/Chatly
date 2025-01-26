import mongoose from "mongoose";

const recentChatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The owner of this recent chat
  chatWith: { type: mongoose.Schema.Types.ObjectId, refPath: "chatType", required: true }, // The entity being chatted with
  chatType: { type: String, enum: ["User", "Group"], required: true }, // Type: User or Group
  lastMessage: { type: String }, // Last message exchanged
  updatedAt: { type: Date, default: Date.now }, // Timestamp for sorting
});

// Prevent duplicate recent chat entries
recentChatSchema.index({ user: 1, chatWith: 1 }, { unique: true });

export default mongoose.model("RecentChat", recentChatSchema);
