import { Button, DialogActions } from "@mui/material";
import { useState } from "react";
import * as student from "../../utils/operations/student.js";
import { useSeatingSelector } from "../context/SeatingSelectorContext";
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

  const handleClose = () => {
    setOpenBookConfirmationDialog(false);
  }

  const handleConfirm = async () => {
    try {
      setBusy(true);
      await student.claimUnoccupiedSeat({
        tableId: selectedTableId,
        seatNumber: selectedSeatNumber,
      });
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