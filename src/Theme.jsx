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
    success: {
      main: '#43ad3a',
    },
  },
  typography: {
    ...baseTheme.typography,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'rgb(250, 250, 250)',
        },
      },
    },
  },
});

export default theme;