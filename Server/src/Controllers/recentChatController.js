import RecentChat from "../models/RecentChat.js";

// Update or add recent chat
export const updateRecentChat = async (userId, chatWithId, chatType, lastMessage) => {
  try {
    await RecentChat.findOneAndUpdate(
      { user: userId, chatWith: chatWithId }, // Find by user and chat partner
      { chatWith: chatWithId, chatType, lastMessage, updatedAt: Date.now() }, // Update details
      { upsert: true, new: true } // Create new entry if it doesn’t exist
    );
  } catch (error) {
    console.error("Error updating recent chat:", error);
  }
};
