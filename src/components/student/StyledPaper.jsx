import { Paper } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(({ ...props }) => <Paper {...props} />)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  aspectRatio: "1/1",
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

export default StyledPaper;