import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import AccountButton from '../AccountButton';
import { useAuth } from "../context/AuthContext";
import { useStudentsContext } from "../context/StudentsContext";

export default function StudentAppBar() {
  const students = useStudentsContext();
  const { user } = useAuth();
  const student = students[user.uid];

  console.log("StudentAppBar", student);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 0 }}>
        <Toolbar sx={{
          gap: 1
        }}>
          <Typography
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            variant="h6"
            noWrap
            component="div"
          >
            {Boolean(student) ? `Welcome, ${student.fname} ${student.lname}!` : "Student Dashboard"}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <AccountButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}