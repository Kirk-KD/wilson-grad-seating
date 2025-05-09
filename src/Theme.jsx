import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme();
const theme = createTheme({
  ...baseTheme,
  palette: {
    type: 'light',
    primary: {
      main: '#4752ec',
    },
    secondary: {
      main: '#D23F3F',
    },
    success: {
      main: '#27926d',
    },
    background: {
      default: '#f7f8ff',
    },
    warning: {
      main: '#ef6c00',
    },
  },
  typography: {
    ...baseTheme.typography,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  }
});

export default theme;