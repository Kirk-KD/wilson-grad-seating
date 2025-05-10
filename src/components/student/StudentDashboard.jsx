import { Alert, Box, Button, Container, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useSeatingSelector } from "../context/SeatingSelectorContext";
import { useStudentsContext } from "../context/StudentsContext";
import { useStudentSeatBooking } from "../context/StudentSeatBookingContext";
import { useTablesContext } from "../context/TablesContext";
import OverviewItemCard from "../OverviewItemCard";
import SeatingDisplay from "../seating/SeatingDisplay";
import TableChip from "../seating/TableChip";
import BookingCardDialog from "./BookingCardDialog";
import BookingConfirmationDialog from "./BookingConfirmationDialog";
import BookingTableDialog from "./BookingTableDialog";

export default function StudentDashboard() {
  const students = useStudentsContext();
  const tables = useTablesContext();
  const { setSelectedTableId, setOpenTableDialog } = useSeatingSelector();
  const { setOpenBookingCardDialog } = useStudentSeatBooking();
  const { user, loading } = useAuth();

  const title = <Box sx={{ display: "flex", alignItems: "center"}}>
    <>Book a Seat</>
    <Box sx={{ flexGrow: 1 }} />
    <Button variant="contained" color="secondary" onClick={() => setOpenBookingCardDialog(true)}>Your Card</Button>
  </Box>

  const student = students[user.uid];

  return (
    <>
      <BookingTableDialog />
      <BookingConfirmationDialog />
      <BookingCardDialog />
      <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingY: 4 }}>
        {
          !Boolean(student?.allowBook) && (
            <Alert severity="warning" sx={{ width: "100%" }}>
              You are not allowed to book or change your seat at this time.
            </Alert>
          )
        }
        <OverviewItemCard title={title}>
          <SeatingDisplay 
            sx={{ marginX: "auto" }}
            renderTable={
              tableId => (
                <TableChip
                  tableId={tableId}
                  onClick={id => {
                    if (!Boolean(student?.allowBook)) return;

                    const table = tables[tableId];
                    const occupied = table
                      ? Object.values(table.seats || {}).filter(uid => uid != null).length
                      : 0;
                    if (occupied >= 10) return;

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