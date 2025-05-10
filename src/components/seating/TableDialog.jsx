import CloseIcon from "@mui/icons-material/Close";
import {
  DialogContent,
  DialogTitle,
  Grow,
  IconButton
} from "@mui/material";
import { forwardRef } from "react";
import { useSeatingSelector } from "../context/SeatingSelectorContext";
import StyledDialog from "./StyledDialog";
import TableSeatsDisplay from "./TableSeatsDisplay";

const DynamicGrow = forwardRef(function Transition(props, ref) {
  const { style, transformOrigin, ...other } = props;
  return (
    <Grow
      {...other}
      ref={ref}
      style={{
        transformOrigin,
        ...style,
      }}
    />
  );
});

export default function TableDialog({ dialogActions }) {
  const {
    selectedTableId,
    setSelectedTableId,
    selectedSeatNumber,
    setSelectedSeatNumber,
    openTableDialog,
    dialogAnchor,
    setOpenTableDialog
  } = useSeatingSelector();

  const handleClose = () => {
    setOpenTableDialog(false);
    setSelectedSeatNumber(null);
  };

  return (
    <StyledDialog
      open={openTableDialog}
      onClose={handleClose}

      slots={{ transition: DynamicGrow }}
      slotProps={{
        transition: {
          transformOrigin: dialogAnchor
            ? `${dialogAnchor.x}px ${dialogAnchor.y}px`
            : undefined,
        },
        paper: {
          sx: { margin: "auto" },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>Table #{selectedTableId}</DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <TableSeatsDisplay />
      </DialogContent>
      {dialogActions}
    </StyledDialog>
  );
}
