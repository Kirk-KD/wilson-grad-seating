import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSeatingSelector } from "../../context/SeatingSelectorContext";
import SeatingDisplay from "../../seating/SeatingDisplay";
import TableChip from "../../seating/TableChip";
import OverviewItemCard from "../OverviewItemCard";

export default function SeatingEditor() {
  const {
    setSelectedTableId,
    setOpenTableDialog
  } = useSeatingSelector();

  return (
    <OverviewItemCard title="Seating Editor">
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

      <Typography color="textSecondary" variant="subtitle1" align="center" width={"100%"}>Each button is a table. Click on one to see and manage individual seats.</Typography>
    </OverviewItemCard>
  );
}