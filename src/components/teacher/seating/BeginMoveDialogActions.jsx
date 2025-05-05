import { Button, DialogActions } from "@mui/material";

export default function BeginMoveDialogActions({ hasSelection, onClickMove, onClickRemove, onClickCancle }) {
  return <DialogActions>
    <Button variant="outlined" disabled={!hasSelection} onClick={onClickMove}>Move</Button>
    <Button variant="outlined" disabled={!hasSelection} onClick={onClickRemove}>Remove</Button>
    <Button variant="outlined" onClick={onClickCancle}>Cancel</Button>
  </DialogActions>
}