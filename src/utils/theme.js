import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      paper: "#263238",
      default: "#171c20",
    },
    text: {
      primary: "#b0bec5",
      secondary: "#cfd8dc",
    },
  },
  typography: {
    h1: {
      fontSize: "2.4rem",
    },
    h2: {
      fontSize: "2.1rem",
    },
    h3: {
      fontSize: "1.7rem",
    },
    h4: {
      fontSize: "1.4rem",
    },
    h5: {
      fontSize: "1.2rem",
    },
    h6: {
      fontSize: "1rem",
    },
  },
});
