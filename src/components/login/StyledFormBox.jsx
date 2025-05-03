import { styled } from "@mui/material";
import { Box } from "@mui/system";

const StyledFormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  flexGrow: 1,
  gap: theme.spacing(3),
  padding: theme.spacing(5),
}));

export default StyledFormBox;