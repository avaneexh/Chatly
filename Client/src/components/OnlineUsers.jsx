import React from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";

const OnlineUsers = ({ users }) => {
  return (
    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
      <Typography variant="h6" mb={1}>
        Online Users
      </Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={user.profilePicture || "/default-avatar.png"} alt={user.username} />
            </ListItemAvatar>
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default OnlineUsers;
