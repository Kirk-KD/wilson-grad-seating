import { Button, DialogActions } from "@mui/material";
import { useState } from "react";
import { vacateSeat } from "../../../utils/operations/teacher.js";
import { useSeatingSelector } from "../../context/SeatingSelectorContext";
import { useTablesContext } from "../../context/TablesContext";
import { useTeacherSeatingEditor } from "../../context/TeacherSeatingEditorContext";
import LoadingButton from "../../LoadingButton.jsx";

export default function EditorTableDialogActions() {
  const tables = useTablesContext();
  const {
    selectedTableId,
    setSelectedTableId,
    selectedSeatNumber,
    setSelectedSeatNumber,
    setOpenTableDialog,
  } = useSeatingSelector();
  const { setOpenAssignDialog } = useTeacherSeatingEditor();

  // for remove button
  const [busy, setBusy] = useState(false);

  const hasSelection = () => selectedTableId != null && selectedSeatNumber != null;
  const hasOccupant = () => tables[selectedTableId].seats[selectedSeatNumber] != null;

  const onClickAssign = async () => {
    setOpenAssignDialog(true);
  };

  const onClickRemove = async () => {
    try {
      setBusy(true);
      await vacateSeat({ tableId: selectedTableId, seatNumber: selectedSeatNumber });
      setSelectedSeatNumber(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  const onClickClose = () => {
    setSelectedTableId(null);
    setSelectedSeatNumber(null);
    setOpenTableDialog(false);
  }
  
  return <DialogActions>
    <Button variant="contained" disabled={!hasSelection() || hasOccupant() || busy} onClick={onClickAssign}>Assign</Button>
    <LoadingButton busy={busy} variant="contained" disabled={!hasSelection() || !hasOccupant() || busy} onClick={onClickRemove}>Remove</LoadingButton>
    <Button variant="outlined" onClick={onClickClose} disabled={busy}>Done</Button>
  </DialogActions>
}