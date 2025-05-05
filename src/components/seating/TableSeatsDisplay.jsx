import { Grid } from "@mui/material";
import { useSeatingEditor } from "../context/SeatingSelectorContext";
import { useTablesContext } from "../context/TablesContext";
import SeatChip from "./SeatChip";

export default function TableSeatsDisplay() {
  const tables = useTablesContext();
  const {
    selectedTableId,
    setSelectedTableId,
    selectedSeatNumber,
    setSelectedSeatNumber,
  } = useSeatingEditor();

  return (
    <Grid container spacing={2}>
      {
        selectedTableId != null &&
        Object.entries(tables[selectedTableId].seats || {}).map(([seatNumber, uid]) => (
          <Grid key={seatNumber}>
            <SeatChip
              seatNumber={seatNumber} 
              occupied={uid != null} 
              onClick={() => setSelectedSeatNumber(seatNumber)}
            />
          </Grid>
        ))
      }
    </Grid>
  );
}
