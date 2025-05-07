import { Container, Typography } from "@mui/material";
import { useSeatingSelector } from "../context/SeatingSelectorContext";
import OverviewItemCard from "../OverviewItemCard";
import SeatingDisplay from "../seating/SeatingDisplay";
import TableChip from "../seating/TableChip";
import BookingConfirmationDialog from "./BookingConfirmationDialog";
import BookingTableDialog from "./BookingTableDialog";

export default function StudentDashboard() {
  const { setSelectedTableId, setOpenTableDialog } = useSeatingSelector();

  return (
    <>
      <BookingTableDialog />
      <BookingConfirmationDialog />
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <OverviewItemCard title="My Bookings">
          <SeatingDisplay 
            sx={{ marginX: "auto" }}
            renderTable={
              tableId => (
                <TableChip
                  tableId={tableId}
                  onClick={id => {
                    setSelectedTableId(id);
                    setOpenTableDialog(true);
                  }}
                />
              )
            }
          />
          <Typography color="textSecondary" variant="subtitle1" align="center" width={"100%"}>
            Each button is a table. Click on one to see individual seats and book or modify your reservation.
          </Typography>
        </OverviewItemCard>
      </Container>
    </>
  )
}