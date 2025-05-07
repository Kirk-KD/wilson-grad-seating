import { Button, DialogActions } from "@mui/material";
import { vacateSeat } from "../../../utils/operations/teacher.js";
import { useSeatingSelector } from "../../context/SeatingSelectorContext";
import { useTablesContext } from "../../context/TablesContext";
import { useTeacherSeatingEditor } from "../../context/TeacherSeatingEditorContext";

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

  const hasSelection = () => selectedTableId != null && selectedSeatNumber != null;
  const hasOccupant = () => tables[selectedTableId].seats[selectedSeatNumber] != null;

  const onClickAssign = async () => {
    setOpenAssignDialog(true);
  };

  const onClickRemove = async () => {
    try {
      await vacateSeat({ tableId: selectedTableId, seatNumber: selectedSeatNumber });
      setSelectedSeatNumber(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const onClickClose = () => {
    setSelectedTableId(null);
    setSelectedSeatNumber(null);
    setOpenTableDialog(false);
  }
  
  return <DialogActions>
    <Button variant="contained" disabled={!hasSelection() || hasOccupant()} onClick={onClickAssign}>Assign</Button>
    <Button variant="contained" disabled={!hasSelection() || !hasOccupant()} onClick={onClickRemove}>Remove</Button>
    <Button variant="outlined" onClick={onClickClose}>Cancel</Button>
  </DialogActions>
}