import CloseIcon from '@mui/icons-material/Close';
import TableChartIcon from '@mui/icons-material/TableChart';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useAuth } from "../context/AuthContext";
import { useSeatingSelector } from '../context/SeatingSelectorContext';
import { useStudentsContext } from "../context/StudentsContext";
import { useStudentSeatBooking } from '../context/StudentSeatBookingContext';

export default function BookingCard({ onClose }) {
  const students = useStudentsContext();
  const { user, loading } = useAuth();
  const student = students[user?.uid];
  const theme = useTheme();
  const { setSelectedTableId, setSelectedSeatNumber, setOpenTableDialog } = useSeatingSelector();
  const { setOpenBookingCardDialog } = useStudentSeatBooking();

  return (
    <Card
      elevation={2}
      sx={{
        width: '100%',
        minWidth: '20rem',
        height: '100%',
        transition: 'box-shadow .3s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      {Boolean(student) && !loading ? (
        <>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                {student.fname[0]}
              </Avatar>
            }
            action={
              <IconButton aria-label="close" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            }
            title={
              <Typography variant="h5" fontWeight={500}>
                {student.fname} {student.lname}
              </Typography>
            }
            subheader={
              <Typography variant="subtitle2" color="textSecondary">
                {user.email}
              </Typography>
            }
          />

          <Divider />

          <CardContent>
            {student.tableId ? (
              <Box display="flex" alignItems="center" mb={2}>
                <TableChartIcon color="primary" sx={{ mr: 1 }}/>
                <Typography variant="h5" color="primary" >
                  Table {student.tableId}, Seat {student.seatNumber}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h5" color="textSecondary" mb={2}>
                No reservation yet.
              </Typography>
            )}

            <Typography variant="body2" color="textSecondary" >
              Donald A. Wilson Grad Social 2025
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant='text' onClick={() => {
              setSelectedTableId(student.tableId);
              setSelectedSeatNumber(student.seatNumber);
              setOpenBookingCardDialog(false);
              setOpenTableDialog(true);
            }}>
              Locate
            </Button>
          </CardActions>
        </>
      ) : (
        <Box p={2}>
          <Typography variant="body2" color="textSecondary">
            Loading...
          </Typography>
        </Box>
      )}
    </Card>
  );
}