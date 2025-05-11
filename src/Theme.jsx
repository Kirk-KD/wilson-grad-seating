import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme();
const theme = createTheme({
  ...baseTheme,
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
      light: '#7986cb',
      dark: "#2c387e"
    },
    secondary: {
      main: '#e53935',
    },
    success: {
      main: '#27926d',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
      transparent: 'rgba(255, 255, 255, 0.6)'
    },
    landingbg: {
      main: '#6e7ae8',
      dark: '#473dc6',
    },
    text: {
      primary:   "rgba(0,0,0,0.87)",
      secondary: "rgba(0,0,0,0.6)",
      disabled:  "rgba(0,0,0,0.38)"
    },
  },
  typography: {
    ...baseTheme.typography,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  }
});

export default theme;