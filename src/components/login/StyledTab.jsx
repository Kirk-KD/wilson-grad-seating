import { styled, Tab } from "@mui/material";

const StyledTab = styled(Tab)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(2.5),
}));

export default StyledTab;