import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as teacher from "../../../utils/operations/teacher.js";
import { useStudentsManagement } from '../../context/StudentsManagementContext';
import LoadingButton from '../../LoadingButton.jsx';

export default function NewStudentDialog() {
  const { newStudentDialogOpen, setNewStudentDialogOpen } = useStudentsManagement();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [oen, setOen] = useState('');

  const [busy, setBusy] = useState(false);

  // Reset fields when dialog opens
  useEffect(() => {
    if (newStudentDialogOpen) {
      setFname('');
      setLname('');
      setEmail('');
      setOen('');
    }
  }, [newStudentDialogOpen]);

  const onClose = () => setNewStudentDialogOpen(false);

  const handleAdd = async () => {
    try {
      setBusy(true);
      await teacher.registerStudent({ fname, lname, email, oen });
      onClose();
    } catch (err) {
      // TODO add error popup if time allows
      alert(`Failed to add new student: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={newStudentDialogOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Student</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="First Name"
            value={fname}
            onChange={e => setFname(e.target.value)}
          />
          <TextField
            label="Last Name"
            value={lname}
            onChange={e => setLname(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="OEN"
            value={oen}
            onChange={e => setOen(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={busy}>Cancel</Button>
        <LoadingButton busy={busy} onClick={handleAdd} variant="contained" disabled={!fname || !lname || !email || !oen || busy}>
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
