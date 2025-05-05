import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSeatingEditor } from "../../context/SeatingSelectorContext";
import SeatingDisplay from "../../seating/SeatingDisplay";
import TableChip from "../../seating/TableChip";
import TableDialog from "../../seating/TableDialog";
import OverviewItemCard from "../OverviewItemCard";
import BeginDialogActions from "./BeginDialogActions";

export default function SeatingEditor() {
  const [openTableDialog, setOpenTableDialog] = useState(false);

  const {
    selectedTableId,
    setSelectedTableId,
    selectedSeatNumber,
    setSelectedSeatNumber,
  } = useSeatingEditor();

  return (
    <OverviewItemCard title="Seating Editor">
      <TableDialog
        open={openTableDialog}
        setOpen={setOpenTableDialog}
        dialogActions={ <BeginDialogActions closeDialog={() => setOpenTableDialog(false)} /> }
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
            renderTable={
              tableId => (
                <TableChip
                  // the tableId is the button's OWN tableID, not props drilling
                  tableId={tableId}
                  // open the dialog and set the currently active table ID
                  onClick={id => {
                    setOpenTableDialog(true);
                    setSelectedTableId(id);
                  }}
                />
              )
            }
          />
        </Box>
      </Paper>

      <Typography variant="p" align="center" width={"100%"}>Each button is a table. Click on one to see individual seats.</Typography>
    </OverviewItemCard>
  );
}