import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AccountButton from '../../AccountButton';

export default function TeacherTopAppBar() {
  return (
    <Box sx={{ 
      flexGrow: 1,
    }}>
      <AppBar position="static">
        <Toolbar sx={{
          gap: 1,
          display: 'flex',
          flexDirection: 'row',
        }}>
          <Typography
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, marginLeft: 3, fontFamily: "'Raleway Variable', sans-serif" }}
            variant="h6"
            noWrap
            component="div"
          >
            Teacher Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <AccountButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}