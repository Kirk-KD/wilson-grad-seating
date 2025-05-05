import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import useLiveSeatMap from "../../../hooks/useLiveSeatMap";
import SeatingDisplay from "../../seating/SeatingDisplay";
import TableChip from "../../seating/TableChip";
import TableDialog from "../../seating/TableDialog";
import BeginDialogActions from "./BeginDialogActions";

export default function SeatingEditor() {
  const [openTableDialog, setOpenTableDialog] = useState(false);
  const [tableId, setTableId] = useState(null);
  const [selectedSeatNumber, setSelectedSeatNumber] = useState(null);
  
  const seatMaps = {};
  for (let i = 0; i < 54; i++) {
    seatMaps[i.toString()] = useLiveSeatMap(i.toString());
  }

  const onCloseDialog = () => {
    setOpenTableDialog(false);
    setTableId(null);
    setSelectedSeatNumber(null);
  };

  return (
    <>
      <TableDialog
        seatMaps={seatMaps}
        tableId={tableId} 
        open={openTableDialog}
        setOpen={setOpenTableDialog}
        dialogActions={
          <BeginDialogActions
            hasSelection={selectedSeatNumber != null}
            hasOccupant={seatMaps[tableId][selectedSeatNumber.toString()] != null}
            onClickCancle={onCloseDialog}
            onClickRemove={onCloseDialog}
            onClickMove={onCloseDialog}
          />
        }
        selectedSeatNumber={selectedSeatNumber}
        setSelectedSeatNumber={setSelectedSeatNumber}
      />

      <Paper elevation={1} sx={{
        margin: "1rem"
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2
        }}>
          <SeatingDisplay 
            renderTable={tableId => <TableChip tableId={tableId} onClick={id => {
              setTableId(id);
              setOpenTableDialog(true);
            }}
          />} />
        </Box>
      </Paper>
    </>
  )
}