import express from "express";
import { updateRecentChat } from "../Controllers/recentChatController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to fetch recent chats
router.get("/", authMiddleware, updateRecentChat);

export default router;
