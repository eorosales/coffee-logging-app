import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#270904",
      contrastText: "#f2f2f2",
    },
    secondary: {
      main: "#460a05",
    },
    background: {
      default: "#1A2026",
      paper: "#8C6954",
    },
    text: {
      primary: "#f2f2f2",
      secondary: "rgba(242,242,242,0.7)",
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
