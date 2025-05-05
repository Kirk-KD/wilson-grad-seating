import CloseIcon from '@mui/icons-material/Close';
import { DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useSeatingEditor } from '../context/SeatingSelectorContext';
import StyledDialog from './StyledDialog';
import TableSeatsDisplay from './TableSeatsDisplay';

export default function TableDialog({ open, setOpen, dialogActions }) {
  const {
    selectedTableId,
    setSelectedTableId,
    selectedSeatNumber,
    setSelectedSeatNumber,
  } = useSeatingEditor();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledDialog
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Table #{selectedTableId}
      </DialogTitle>

      <IconButton
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <TableSeatsDisplay/>
      </DialogContent>

      {dialogActions}
    </StyledDialog>
  )
}