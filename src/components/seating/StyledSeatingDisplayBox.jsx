import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

const StyledSeatingDisplayBox = styled(Box)(({ theme }) => ({
  display: "flex",

  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  overflow: "auto",
  width: "fit-content",
  padding: 16
}));

export default StyledSeatingDisplayBox;
