import { Button, DialogActions } from "@mui/material";
import { useSeatingEditor } from "../../context/SeatingSelectorContext";
import { useTablesContext } from "../../context/TablesContext";

export default function BeginDialogActions({ closeDialog }) {
  const tables = useTablesContext();
  const {
    selectedTableId,
    setSelectedTableId,
    selectedSeatNumber,
    setSelectedSeatNumber,
  } = useSeatingEditor();

  const hasSelection = () => selectedTableId != null && selectedSeatNumber != null;
  const hasOccupant = () => tables[selectedTableId][selectedSeatNumber] != null;
  
  return <DialogActions>
    <Button variant="outlined" disabled={!hasSelection() || hasOccupant()} onClick={closeDialog}>Assign</Button>
    <Button variant="outlined" disabled={!hasSelection() || !hasOccupant()} onClick={closeDialog}>Move</Button>
    <Button variant="outlined" disabled={!hasSelection() || !hasOccupant()} onClick={closeDialog}>Remove</Button>
    <Button variant="outlined" onClick={closeDialog}>Cancel</Button>
  </DialogActions>
}