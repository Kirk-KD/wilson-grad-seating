import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledLoginFormBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "1.5rem",
  gap: "1rem",
  flexGrow: 1
}));

export default StyledLoginFormBox;