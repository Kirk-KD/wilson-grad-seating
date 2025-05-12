import { Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    minWidth: theme.spacing(20),
  },
  color: (theme) => theme.palette.primary.main,
  fontFamily: "'Raleway Variable', sans-serif", 
  fontWeight: 500, 
  "&.Mui-selected": {
    color: (theme) => theme.palette.primary.light,
    fontWeight: 700
  }
}));

export default StyledTab;