import { Box, Button, Container, Typography } from "@mui/material";
import { useSeatingSelector } from "../context/SeatingSelectorContext";
import { useStudentSeatBooking } from "../context/StudentSeatBookingContext";
import OverviewItemCard from "../OverviewItemCard";
import SeatingDisplay from "../seating/SeatingDisplay";
import TableChip from "../seating/TableChip";
import BookingCardDialog from "./BookingCardDialog";
import BookingConfirmationDialog from "./BookingConfirmationDialog";
import BookingTableDialog from "./BookingTableDialog";

export default function StudentDashboard() {
  const { setSelectedTableId, setOpenTableDialog } = useSeatingSelector();
  const { setOpenBookingCardDialog } = useStudentSeatBooking();

  const title = <Box sx={{ display: "flex", alignItems: "center"}}>
    <>Book a Seat</>
    <Box sx={{ flexGrow: 1 }} />
    <Button variant="contained" color="secondary" onClick={() => setOpenBookingCardDialog(true)}>Your Card</Button>
  </Box>

  return (
    <>
      <BookingTableDialog />
      <BookingConfirmationDialog />
      <BookingCardDialog />
      <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingY: 4 }}>
        <OverviewItemCard title={title}>
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