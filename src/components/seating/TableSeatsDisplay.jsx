import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSeatingSelector } from "../context/SeatingSelectorContext";
import { useTablesContext } from "../context/TablesContext";
import SeatChip from "./SeatChip";

export default function TableSeatsDisplay() {
  const tables = useTablesContext();
  const {
    selectedTableId,
    setSelectedTableId,
    selectedSeatNumber,
    setSelectedSeatNumber,
  } = useSeatingSelector();

  return (
    <Box>
      <Grid container spacing={2}>
        {
          selectedTableId != null &&
          Object.entries(tables[selectedTableId].seats || {}).map(([seatNumber, email]) => (
            <Grid key={seatNumber}>
              <SeatChip
                seatNumber={seatNumber} 
                occupant={email} 
                onClick={() => setSelectedSeatNumber(seatNumber)}
              />
            </Grid>
          ))
        }
      </Grid>
      <Typography color="textSecondary" variant="subtitle1" textAlign={"left"} marginTop={1}>Select a seat above to continue.</Typography>
    </Box>
  );
}
