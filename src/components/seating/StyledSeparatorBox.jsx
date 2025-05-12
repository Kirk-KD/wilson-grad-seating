// StyledSeparatorBox.tsx
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledSeparatorBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignSelf: "stretch",
  padding: 5,
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
