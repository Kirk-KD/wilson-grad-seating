import CloseIcon from '@mui/icons-material/Close';
import { DialogContent, DialogTitle, IconButton } from "@mui/material";
import StyledDialog from './StyledDialog';
import TableSeatsDisplay from './TableSeatsDisplay';

export default function TableDialog({ seatMaps, tableId, open, setOpen, dialogActions, selectedSeatNumber, setSelectedSeatNumber }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledDialog
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Table {tableId}
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
        <TableSeatsDisplay seatMaps={seatMaps} tableId={tableId} selectedSeat={selectedSeatNumber} setSeletedSeatNumber={setSelectedSeatNumber} />
      </DialogContent>

      {dialogActions}
    </StyledDialog>
  )
}