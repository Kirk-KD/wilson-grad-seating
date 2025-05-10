import { Button, DialogActions } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useSeatingSelector } from "../context/SeatingSelectorContext";
import { useSettingsContext } from "../context/SettingsContext.jsx";
import { useStudentsContext } from "../context/StudentsContext.jsx";
import { useStudentSeatBooking } from "../context/StudentSeatBookingContext";
import LoadingButton from "../LoadingButton";

export default function BookingConfirmationDialogActions() {
  const {
    selectedTableId,
    selectedSeatNumber,
    setSelectedTableId,
    setSelectedSeatNumber,
  } = useSeatingSelector();
  const { setOpenBookConfirmationDialog } = useStudentSeatBooking();
  const [busy, setBusy] = useState(false);
  const settings = useSettingsContext();
  const students = useStudentsContext();
  const { user, loading } = useAuth();

  const student = students[user.uid];
  const canBook = settings.allowBook !== undefined && settings.allowBook.value
    && settings.deadline !== undefined && new Date() <= settings.deadline.value.toDate()
    && Boolean(student?.allowBook);

  const handleClose = () => {
    setOpenBookConfirmationDialog(false);
  }

  const handleConfirm = async () => {
    try {
      setBusy(true);
      if (canBook) await student.claimUnoccupiedSeat({
        tableId: selectedTableId,
        seatNumber: selectedSeatNumber,
      });
      else alert("Sorry, you aren't allowed to book a seat at this time.");
      handleClose();
    } catch (err) {
      alert(err);
    }
    finally {
      setBusy(false);
    }
  }

  return (
    <DialogActions>
      <LoadingButton variant="contained" onClick={handleConfirm} busy={busy} disabled={busy}>
        Confirm
      </LoadingButton>
      <Button variant="outlined" onClick={handleClose} disabled={busy}>
        Cancel
      </Button>
    </DialogActions>
  )
}