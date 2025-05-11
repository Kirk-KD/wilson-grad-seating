import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import AccountButton from '../AccountButton';
import { useAuth } from "../context/AuthContext";
import { useStudentsContext } from "../context/StudentsContext";

export default function StudentAppBar() {
  const students = useStudentsContext();
  const { user } = useAuth();
  const student = students[user.uid];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ 
        boxShadow: 0, 
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        backgroundColor: (theme) => theme.palette.background.transparent,
      }}>
        <Toolbar sx={{
          gap: 1
        }}>
          <Typography
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: (theme) => theme.palette.primary.dark, fontFamily: "'Raleway Variable', sans-serif", fontWeight: 600, fontSize: '1.5em' }}
            variant="h6"
            noWrap
            component="div"
          >
            {Boolean(student) ? `Welcome, ${student.fname}!` : "Student Dashboard"}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <AccountButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}