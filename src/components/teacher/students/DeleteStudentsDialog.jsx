import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { deleteStudentsBulk } from "../../../utils/operations/teacher.js";
import { useStudentsContext } from "../../context/StudentsContext";
import { useStudentsManagement } from "../../context/StudentsManagementContext";

export default function DeleteStudentsDialog() {
  const { deleteStudentsDialogOpen, setDeleteStudentsDialogOpen, selectedUids, setSelectedUids } = useStudentsManagement();
  const [busy, setBusy] = useState(false);
  const students = useStudentsContext();

  const toBeDeleted = selectedUids.map(uid => ({ ...students[uid], uid }));
  const countBooked = toBeDeleted.filter(({ tableId }) => tableId != null).length;

  const handleClose = () => {
    setDeleteStudentsDialogOpen(false);
  }

  const handleDelete = async () => {
    try {
      setBusy(true);
      await deleteStudentsBulk({ uids: selectedUids });
      setSelectedUids([]);
      setDeleteStudentsDialogOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={deleteStudentsDialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {
          selectedUids.length > 1
          ? `Delete ${toBeDeleted.length} Students`
          : "Delete Student"
        }
      </DialogTitle>
      <DialogContent>
        {busy ? (
          <>
            <Typography>Deleting student account(s)...</Typography>
            <Skeleton variant="rectangular" height={80} />
          </>
        ) : 
        (
          <>
            {
              Boolean(countBooked) &&
              <Alert variant="filled" severity="warning">{`${countBooked} student(s) already booked their seat, don't forget to notify them!`}</Alert>
            }
            <Typography marginBottom={1}>Are you sure you want to delete the following student account(s)?</Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Student</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Booked seat</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {toBeDeleted.map(({ uid, fname, lname, tableId, seatNumber, email }) => (
                    <TableRow key={uid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">{`${lname}, ${fname}`}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell align="right">{tableId != null ? `Table ${tableId}, seat ${seatNumber}` : "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="warning">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}