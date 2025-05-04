import { Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    minWidth: theme.spacing(20),
  },
  "&.Mui-selected": {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium
  }
}));

export default StyledTab;