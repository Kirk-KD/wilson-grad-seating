import { Grid } from "@mui/material";
import SeatChip from "./SeatChip";

export default function TableSeatsDisplay({ seatMaps, tableId, selectedSeat, setSeletedSeatNumber }) {
  return (
    <Grid container spacing={2}>
      {
        tableId !== null &&
        Object.entries(seatMaps[tableId.toString()] || {}).map(([seatNumber, uid]) => (
          <Grid key={seatNumber}>
            <SeatChip
              selectedSeat={selectedSeat}
              seatNumber={seatNumber} 
              occupied={uid != null} 
              onClick={() => setSeletedSeatNumber(seatNumber)}
            />
          </Grid>
        ))
      }
    </Grid>
  );
}
