import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const ChatBox = ({ messages, currentUserId }) => {
  return (
    <Box
      sx={{
        overflowY: "scroll",
        height: "400px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
      className="chat-box"
    >
      {messages.map((message, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent={message.sender._id === currentUserId ? "flex-end" : "flex-start"}
          mb={2}
        >
          {/* If the current user sent the message, hide the Avatar */}
          {message.sender._id !== currentUserId && (
            <Avatar
              src={message.sender.profilePicture || "/default-avatar.png"}
              alt={message.sender.username}
              sx={{ width: 40, height: 40 }}
            />
          )}

          <Box
            ml={message.sender._id !== currentUserId ? 2 : 0}
            mr={message.sender._id === currentUserId ? 2 : 0}
            sx={{
              maxWidth: "70%",
              backgroundColor: message.sender._id === currentUserId ? "#1976d2" : "#e0e0e0",
              color: message.sender._id === currentUserId ? "#fff" : "#000",
              padding: "12px 16px",
              borderRadius: "12px",
              wordWrap: "break-word",
              overflow: "hidden",
            }}
          >
            {/* Display the sender's username for messages not sent by the current user */}
            {message.sender._id !== currentUserId && (
              <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                {message.sender.username}
              </Typography>
            )}

            {/* Text Message */}
            <Typography variant="body1">{message.text}</Typography>

            {/* Image Message */}
            {message.image && (
              <Box mt={1}>
                <img
                  src={message.image}
                  alt="Message Attachment"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => window.open(message.image, "_blank")}
                />
              </Box>
            )}
          </Box>

          {/* If the current user sent the message, show their Avatar */}
          {message.sender._id === currentUserId && (
            <Avatar
              src={message.sender.profilePicture || "/default-avatar.png"}
              alt="You"
              sx={{ width: 40, height: 40 }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ChatBox;
