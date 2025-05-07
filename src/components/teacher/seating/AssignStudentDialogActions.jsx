import { Button, DialogActions } from "@mui/material";
import { useState } from "react";
import { assignStudentToSeat } from "../../../utils/operations/teacher.js";
import { useSeatingSelector } from "../../context/SeatingSelectorContext";
import { useTeacherSeatingEditor } from "../../context/TeacherSeatingEditorContext.jsx";
import LoadingButton from "../../LoadingButton.jsx";

export default function AssignStudentDialogActions() {
  const { 
    selectedTableId,
    setSelectedTableId,
    selectedSeatNumber,
    setSelectedSeatNumber
  } = useSeatingSelector();
  const {
    setOpenAssignDialog,
    setSelectedStudent,
    selectedStudent
  } = useTeacherSeatingEditor();

  const [busy, setBusy] = useState(false);

  const onClickAssign = async () => {
    try {
      setBusy(true);
      await assignStudentToSeat({ tableId: selectedTableId, seatNumber: selectedSeatNumber, uid: selectedStudent.uid });
      setSelectedStudent(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setOpenAssignDialog(false);
      setSelectedSeatNumber(null);
      setBusy(false);
    }
  }

  const closeDialog = () => {
    setOpenAssignDialog(false);
  }

  const cannotAssign =
    selectedStudent == null || 
    selectedSeatNumber == null ||
    selectedTableId == null;
  
  return <DialogActions>
    <LoadingButton
      variant="contained" 
      disabled={cannotAssign || busy} 
      busy={busy}
      onClick={onClickAssign}
    >Assign</LoadingButton>
    <Button variant="outlined" onClick={closeDialog} disabled={busy}>Cancel</Button>
  </DialogActions>
}