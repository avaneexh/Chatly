import React, { useState } from "react";
import { Box, TextField, Button, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSend = () => {
    if (text.trim() || image) {
      onSendMessage({ text, image });
      setText("");
      setImage(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box display="flex" alignItems="center" mt={2}>
      <TextField
        variant="outlined"
        placeholder="Type your message..."
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mr: 2 }}
      />
      <IconButton color="primary" component="label">
        <PhotoCamera />
        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        disabled={!text.trim() && !image}
      >
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;
