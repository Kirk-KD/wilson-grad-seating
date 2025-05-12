import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.transparent,
  borderRadius: '20px',
  padding: `clamp(10px, 1vw, ${theme.spacing(4)})`,
}));

export default StyledBox;