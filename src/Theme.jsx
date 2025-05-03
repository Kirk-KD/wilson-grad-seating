import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme();
const theme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#ffb74d',
    },
    secondary: {
      main: '#1976d2',
    },
  },
  typography: {
    ...baseTheme.typography,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  }
});

export default theme;