import { Tab } from '@mui/material';
import { darken, styled } from '@mui/material/styles';

const textColor = (theme) => theme.palette.getContrastText(theme.palette.primary.main);

const StyledTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    minWidth: theme.spacing(20),
  },
  color: darken(textColor(theme), 0.2),
  "&.Mui-selected": {
    color: textColor(theme),
    fontWeight: theme.typography.fontWeightMedium
  }
}));

export default StyledTab;