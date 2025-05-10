import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

const StyledTableChipButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'bgColor' && prop !== 'hoverColor',
})(({ theme, bgColor, hoverColor }) => ({
  width: "13vw",
  padding: 0,
  aspectRatio: "1 / 1",
  borderRadius: "30%",
  backgroundColor: bgColor || theme.palette.grey[200],
  "&:hover": {
    backgroundColor: hoverColor || theme.palette.grey[300],
  },
  [theme.breakpoints.up("md")]: {
    width: "4.5vw",
  },
}));

export default StyledTableChipButton;
