import { Button, DialogActions } from "@mui/material";
import { useSeatingSelector } from "../context/SeatingSelectorContext.jsx";
import { useStudentSeatBooking } from "../context/StudentSeatBookingContext.jsx";
import { useTablesContext } from "../context/TablesContext.jsx";
import LoadingButton from "../LoadingButton.jsx";

export default function BookingTableDialogActions() {
  const tables = useTablesContext();
  const {
    selectedTableId,
    setSelectedTableId,
    selectedSeatNumber,
    setSelectedSeatNumber,
    setOpenTableDialog,
  } = useSeatingSelector();
  const { setOpenBookConfirmationDialog } = useStudentSeatBooking();

  const hasSelection = () => selectedTableId != null && selectedSeatNumber != null;
  const hasOccupant = () => tables[selectedTableId].seats[selectedSeatNumber] != null;

  const onClickBook = () => {
    setOpenBookConfirmationDialog(true);
  }

  const onClickClose = () => {
    // setSelectedTableId(null);
    setSelectedSeatNumber(null);
    setOpenTableDialog(false);
  }
  
  return <DialogActions>
    <LoadingButton variant="contained" disabled={!hasSelection() || hasOccupant()} onClick={onClickBook}>Book</LoadingButton>
    <Button variant="outlined" onClick={onClickClose}>Done</Button>
  </DialogActions>
}