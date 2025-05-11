import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

const StyledTableChipButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'bgColor' && prop !== 'hoverColor',
})(({ theme, bgColor, hoverColor }) => {
  const effectiveBgColor = bgColor || theme.palette.grey[200];
  const textColor = theme.palette.getContrastText(effectiveBgColor);

  return {
    width: "13vw",
    padding: 0,
    aspectRatio: "1 / 1",
    borderRadius: "20%",
    backgroundColor: effectiveBgColor,
    color: textColor,
    "&:hover": {
      backgroundColor: hoverColor || theme.palette.grey[300],
      color: theme.palette.getContrastText(hoverColor || theme.palette.grey[300]),
    },
    [theme.breakpoints.up("md")]: {
      width: "4.5vw",
    },
  };
});

export default StyledTableChipButton;
