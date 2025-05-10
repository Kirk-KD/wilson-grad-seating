import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSeatingSelector } from "../../context/SeatingSelectorContext";
import SeatingDisplay from "../../seating/SeatingDisplay";
import TableChip from "../../seating/TableChip";

export default function SeatingEditor() {
  const {
    setSelectedTableId,
    setOpenTableDialog
  } = useSeatingSelector();

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
      <Typography color="textSecondary" variant="subtitle1" align="center" width={"100%"}>Each button is a table. Click on one to see and manage individual seats.</Typography>
    </Box>
  );
}