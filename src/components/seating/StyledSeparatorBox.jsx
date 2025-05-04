import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledSeparatorBox = styled(Box)(({ theme }) => ({
  // vertical
  height: "fit-content",
  width: "100%",
  marginTop: 20,
  marginBottom: 20,
  marginLeft: 0,
  marginRight: 0,
  borderTop: `1px dashed ${theme.palette.text.secondary}`,
  borderBottom: `1px dashed ${theme.palette.text.secondary}`,
  flexDirection: "row",
  justifyContent: "center",

  // horizontal
  [theme.breakpoints.up("md")]: {
    height: "100%",
    width: "fit-content",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 20,
    marginRight: 20,
    borderTop: "none",
    borderBottom: "none",
    borderLeft: `1px dashed ${theme.palette.text.secondary}`,
    borderRight: `1px dashed ${theme.palette.text.secondary}`,
    flexDirection: "column",
    alignItems: "center",
  },

  padding: 5,
  display: "flex",
  backgroundImage: `repeating-linear-gradient(
    45deg,
    #fff,
    #fff 10px,
    rgba(0,0,0,0.05) 10px,
    rgba(0,0,0,0.05) 20px
  )`
}));

export default StyledSeparatorBox;