import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
      contrastText: "#ffffff", // White text
    },
    secondary: {
      main: "#dc004e", // Pinkish red
      contrastText: "#ffffff", // White text
    },
    background: {
      default: "#f4f6f8", // Light background
      paper: "#ffffff", // White card background
    },
    text: {
      primary: "#333333", // Dark text
      secondary: "#555555", // Medium-dark text
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    button: {
      textTransform: "none", // Disable all-uppercase on buttons
    },
  },
  shape: {
    borderRadius: 8, // Apply rounded corners globally
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;
