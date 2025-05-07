import { DialogContent, DialogTitle, Typography } from "@mui/material";
import { useSeatingSelector } from "../../context/SeatingSelectorContext";
import { useTeacherSeatingEditor } from "../../context/TeacherSeatingEditorContext";
import StyledDialog from "../../seating/StyledDialog";
import StudentsAutocomplete from "../StudentsAutocomplete";
import AssignStudentDialogActions from "./AssignStudentDialogActions";

export default function AssignStudentDialog() {
  const { 
    selectedTableId,
    setSelectedTableId,
    selectedSeatNumber,
    setSelectedSeatNumber,
  } = useSeatingSelector();
  const {
    openAssignDialog,
    setOpenAssignDialog,
    selectedStudent,
    setSelectedStudent
  } = useTeacherSeatingEditor();

  const handleClose = () => {
    // clear selection and close
    setSelectedSeatNumber(null);
    setSelectedStudent(null);
    setOpenAssignDialog(false);
  }

  return (
    <StyledDialog open={openAssignDialog} onClose={handleClose}>
      <DialogTitle>
        Assign table {selectedTableId}, seat {selectedSeatNumber}
      </DialogTitle>
      <DialogContent>
        <StudentsAutocomplete sx={{ marginY: 1 }} filter={(student) => student.tableId == null} onChange={(event, student) => setSelectedStudent(student)}/>
        <Typography variant="subtitle1" color="textSecondary">Find students without seats by name or OEN.</Typography>
      </DialogContent>
      <AssignStudentDialogActions />
    </StyledDialog>
  )
}