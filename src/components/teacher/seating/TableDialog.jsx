import CloseIcon from '@mui/icons-material/Close';
import { DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useSeatingSelector } from '../../context/SeatingSelectorContext';
import StyledDialog from '../../seating/StyledDialog';
import TableSeatsDisplay from '../../seating/TableSeatsDisplay';

export default function TableDialog({ dialogActions }) {
  const {
    selectedTableId,
    setSelectedTableId,
    selectedSeatNumber,
    setSelectedSeatNumber,
    openTableDialog,
    setOpenTableDialog
  } = useSeatingSelector();

  // close dialog but also clear all selections
  const handleClose = () => {
    setOpenTableDialog(false);
    setSelectedTableId(null);
    setSelectedSeatNumber(null);
  };

  return (
    <StyledDialog
      open={openTableDialog}
      onClose={handleClose}
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