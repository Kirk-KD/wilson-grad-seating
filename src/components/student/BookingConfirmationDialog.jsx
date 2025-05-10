import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useSeatingSelector } from "../context/SeatingSelectorContext";
import { useStudentsContext } from "../context/StudentsContext";
import { useStudentSeatBooking } from "../context/StudentSeatBookingContext";
import BookingConfirmationDialogActions from "./BookingConfirmationDialogActions";

export default function BookingConfirmationDialog() {
  const { openBookConfirmationDialog, setOpenBookConfirmationDialog } = useStudentSeatBooking();
  const { 
    selectedTableId,
    selectedSeatNumber
  } = useSeatingSelector();
  const { user, loading } = useAuth();
  const students = useStudentsContext();

  const handleClose = () => {
    setOpenBookConfirmationDialog(false);
  }

  const student = students[user.email];
  return (
    <Dialog open={openBookConfirmationDialog} onClose={handleClose}>
      <DialogTitle>Confirmation</DialogTitle>
      {Boolean(student) && !loading &&
        <>
          <DialogContent>
            <Typography>
              Book a seat at table {selectedTableId}, seat {selectedSeatNumber} for {student.fname} {student.lname}?
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              You can still change your choice later.
            </Typography>
          </DialogContent>
          <BookingConfirmationDialogActions />
        </>
      }
    </Dialog>
  );
}
