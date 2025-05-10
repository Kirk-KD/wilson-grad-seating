// StyledSeparatorBox.tsx
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledSeparatorBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignSelf: "stretch",
  padding: 5,
  backgroundImage: `repeating-linear-gradient(
    45deg,
    #fff,
    #fff 10px,
    rgba(0,0,0,0.05) 10px,
    rgba(0,0,0,0.05) 20px
  )`,
  borderRadius: "5px",

  // vertical layout (xs–sm)
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  margin: "20px 0",

  [theme.breakpoints.up("md")]: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "auto",
    margin: "0 20px",
  },
}));

export default StyledSeparatorBox;
