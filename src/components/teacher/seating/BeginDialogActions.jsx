import { Button, DialogActions } from "@mui/material";

export default function BeginDialogActions({ hasSelection, hasOccupant, onClickAssign, onClickMove, onClickRemove, onClickCancle }) {
  return <DialogActions>
    <Button variant="outlined" disabled={!hasSelection || hasOccupant} onClick={onClickAssign}>Assign</Button>
    <Button variant="outlined" disabled={!hasSelection || !hasOccupant} onClick={onClickMove}>Move</Button>
    <Button variant="outlined" disabled={!hasSelection || !hasOccupant} onClick={onClickRemove}>Remove</Button>
    <Button variant="outlined" onClick={onClickCancle}>Cancel</Button>
  </DialogActions>
}