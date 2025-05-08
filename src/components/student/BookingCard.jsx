import { Skeleton, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useAuth } from "../context/AuthContext";
import { useStudentsContext } from "../context/StudentsContext";
import StyledPaper from "./StyledPaper";

export default function BookingCard() {
  const students = useStudentsContext();
  const { user, loading } = useAuth();

  const student = students[user?.uid];

  const theme = useTheme();

  return (
    <StyledPaper elevation={1}>
      {
        Boolean(student) && !loading ?
        <>
          <Typography variant="h1" color="textSecondary">
          {student.lname}, {student.fname}
          </Typography>
          
          <Typography variant="subtitle1" color="textSecondary" marginLeft={1}>
            {user.email}
          </Typography>

          <Box color={theme.palette.divider} borderBottom={1} width="100%" />

          <br />

          {
            Boolean(student.tableId) ?
            <>
              <Typography variant="h4" color="success" marginTop={2}>
                Table {student.tableId}, Seat {student.seatNumber}
              </Typography>
            </>
            : <>
              <Typography variant="h4" color="textSecondary" marginTop={2}>
                No reservation yet.
              </Typography>
            </>
          }

          <Box flexGrow={1} />

          <Typography variant="subtitle2" color="textSecondary" marginTop={2}>Donald A. Wilson Grad Social 2025</Typography>
        </> :
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"100%"}
          animation="wave"
        />
      }
    </StyledPaper>
  );
}