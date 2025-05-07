import { Link, Typography } from "@mui/material";
import { TablesProvider } from "../../context/TablesContext";
import SeatingDisplay from "../../seating/SeatingDisplay";
import TableChip from "../../seating/TableChip";

export default function ReadOnlySeatLayout() {
  return (
    <TablesProvider>
      <SeatingDisplay 
        renderTable={tableId => <TableChip tableId={tableId} onClick={id => {}} />}
      />
      <Typography variant="subtitle1" color="textSecondary" align="center">
        This is read-only to show the overall occupancy. To manage seating assignment, <Link href="/admin/seating" underline="always">go to seating</Link>.
      </Typography>
    </TablesProvider>
  );
}