import { Button, DialogActions } from "@mui/material";
import { assignStudentToSeat } from "../../../utils/operations/teacher.js";
import { useSeatingSelector } from "../../context/SeatingSelectorContext";
import { useTeacherSeatingEditor } from "../../context/TeacherSeatingEditorContext.jsx";

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

  const onClickAssign = async () => {
    try {
      await assignStudentToSeat({ tableId: selectedTableId, seatNumber: selectedSeatNumber, uid: selectedStudent.uid });
      setSelectedStudent(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setOpenAssignDialog(false);
      setSelectedSeatNumber(null);
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
    <Button 
      variant="contained" 
      disabled={cannotAssign} 
      onClick={onClickAssign}
    >Assign</Button>
    <Button variant="outlined" onClick={closeDialog}>Cancel</Button>
  </DialogActions>
}