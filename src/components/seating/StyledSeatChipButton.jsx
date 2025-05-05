import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

const StyledSeatChipButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'bgColor' && prop !== 'hoverColor',
})(({ theme, bgColor, hoverColor }) => ({
  width: "2.5rem",
  padding: 0,
  aspectRatio: "1 / 1",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: bgColor || theme.palette.grey[200],
  "&:hover": {
    backgroundColor: hoverColor || theme.palette.grey[300],
  },
}));

export default StyledSeatChipButton;
