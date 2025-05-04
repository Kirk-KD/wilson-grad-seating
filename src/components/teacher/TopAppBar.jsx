import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AccountButton from './AccountButton';
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";

export default function TeacherTopAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{
          gap: 1
        }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            variant="h6"
            noWrap
            component="div"
          >
            Dashboard
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search students, tools..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <AccountButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}