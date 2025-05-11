import { Alert, Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useSeatingSelector } from "../context/SeatingSelectorContext";
import { useSettingsContext } from "../context/SettingsContext";
import { useStudentsContext } from "../context/StudentsContext";
import { useTablesContext } from "../context/TablesContext";
import SeatingDisplay from "../seating/SeatingDisplay";
import TableChip from "../seating/TableChip";
import BookingCardDialog from "./BookingCardDialog";
import BookingConfirmationDialog from "./BookingConfirmationDialog";
import BookingTableDialog from "./BookingTableDialog";

export default function StudentDashboard() {
  const tables = useTablesContext();
  const { setSelectedTableId, setOpenTableDialog } = useSeatingSelector();
  const { user, loading } = useAuth();

  const settings = useSettingsContext();
  const students = useStudentsContext();
  const student = students[user.uid];
  const canBook = settings.allowBook !== undefined && settings.allowBook.value
    && settings.deadline !== undefined && new Date() <= settings.deadline.value.toDate()
    && Boolean(student?.allowBook);

  return (
    <Box position={"relative"}>
      <BookingTableDialog />
      <BookingConfirmationDialog />
      <BookingCardDialog />
      {
        !canBook && (
          <Alert severity="warning" sx={{ width: "100%" }}>
            You are not allowed to book or change your seat at this time.
          </Alert>
        )
      }

      {/* <Button
        variant="contained"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 100,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: (theme) => theme.palette.primary.main,
          '&:hover': {
            backgroundColor: (theme) => theme.palette.primary.dark,
          },
        }}
        onClick={() => setOpenBookingCardDialog(true)}
      >
        View my seat
      </Button> */}

      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "column", 
        paddingY: '4vh',
      }}>
        <Box sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          width: 'fit-content',
          height: 'fit-content',
          borderRadius: '20px',
          paddingX: '0.5vw',
          paddingBottom: '0.5vw'
        }}>
          <SeatingDisplay
            renderTable={
              tableId => (
                <TableChip
                  tableId={tableId}
                  onClick={(id, e) => {
                    if (!canBook) return;

                    const table = tables[tableId];
                    const occupied = table
                      ? Object.values(table.seats || {}).filter(uid => uid != null).length
                      : 0;
                    if (occupied >= 10) return;

                    setSelectedTableId(id);

                    const rect = e.currentTarget.getBoundingClientRect();
                    const anchor = { 
                      x: rect.left + rect.width / 2,
                      y: rect.top + rect.height / 2
                    };

                    setOpenTableDialog(true, anchor);
                  }}
                />
              )
            }
          />
        </Box>
      </Box>

      <Typography color="textSecondary" variant="subtitle1" align="left" width="50%" marginTop={2} marginX="auto">
        Each button is a table. Click on one to see individual seats and book or modify your reservation.
        <br />
        Your seat choice isn't final and may be moved by teachers if neccessary.
        <br />
        This display is not entirely indicative of the actual layout.
      </Typography>
    </Box>
  )
}