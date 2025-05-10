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

  const table = tables[selectedTableId];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: (theme) => theme.spacing(2),
        }}
      >
        {
          Boolean(table) ?
          Object.entries(table.seats || {}).map(([seatNumber, uid]) => (
            <Grid key={seatNumber}>
              <SeatChip
                seatNumber={seatNumber} 
                occupant={uid} 
                onClick={() => setSelectedSeatNumber(seatNumber)}
              />
            </Grid>
          )) :
          [...Array(10)].map((_, index) => (
            <Grid key={index}>
              <SeatChip
                seatNumber={index}
                occupant={null}
                onClick={() => {}}
              />
            </Grid>
          ))
        }
      </Grid>
      <Typography color="textSecondary" variant="subtitle1" textAlign={"left"} marginTop={1}>Select a seat above to continue.</Typography>
    </Box>
  );
}
