import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const StyledSeatingDisplayPaper = styled(Paper)(({ theme }) => ({
  display: "flex",

  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  padding: theme.spacing(4),
  margin: theme.spacing(1),

  overflow: "auto"
}));

export default StyledSeatingDisplayPaper;
