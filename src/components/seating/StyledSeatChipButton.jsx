import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

const StyledSeatChipButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'bgColor' && prop !== 'hoverColor',
})(({ theme, bgColor, hoverColor }) => ({
  width: "4vw",
  padding: 0,
  aspectRatio: "1 / 1",
  borderRadius: "30%",
  backgroundColor: bgColor || theme.palette.grey[200],
  "&:hover": {
    backgroundColor: hoverColor || theme.palette.grey[300],
  },
  [theme.breakpoints.down("md")]: {
    width: "10vw", // Adjust width for smaller screens
  },
}));

export default StyledSeatChipButton;
