import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Alert, Box, Tooltip, Typography } from "@mui/material";
import { styled } from '@mui/system';
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
import CountdownTimer from './CountdownTimer';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.transparent,
  borderRadius: '20px',
  padding: `clamp(10px, 1vw, ${theme.spacing(4)})`,
}));

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
    <Box position={"relative"} width={"100%"} px={2} paddingBottom={2}>
      <BookingTableDialog />
      <BookingConfirmationDialog />
      <BookingCardDialog />

      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "column", 
        paddingY: '4vh',
      }}>
        <Box sx={{
          width: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            width: 'max-content',
            height: 'fit-content',
            gap: 2,
            flexWrap: 'wrap'
          }}>
            <Tooltip title="Booking status" placement='top'>
              <StyledBox sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                {
                  student?.tableId !== null && student?.seatNumber !== null ?
                  <CheckCircleIcon sx={{ mr: 1, color: (theme) => theme.palette.success.main }}/> :
                  <TableChartIcon sx={{ mr: 1, color: (theme) => theme.palette.primary.main }}/>
                }
                <Typography variant="h5" sx={{
                  fontSize: '1.4em',
                  color: (theme) => theme.palette.primary.main
                }}>
                  {Boolean(student) ? (
                    student.tableId !== null && student.seatNumber !== null ?
                    `Table ${student.tableId}, Seat ${student.seatNumber}` :
                    'No reservation yet'
                  ) : 'Loading...'}
                </Typography>
              </StyledBox>
            </Tooltip>

            <Tooltip title="Deadline" placement='top'>
              <StyledBox>
                {settings.deadline !== undefined && <CountdownTimer deadline={settings.deadline.value.toDate()} />}
              </StyledBox>
            </Tooltip>

            {
              !canBook && (
                <Alert severity="warning" sx={{
                  width: "fit-content",
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '20px',
                  fontSize: '1.2em'
                }}>
                  Booking is closed at this time
                </Alert>
              )
            }
          </Box>

          <StyledBox sx={{
            width: 'fit-content',
            height: 'fit-content',
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
          </StyledBox>

          <StyledBox sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'row' }}>
            <Box sx={{
              color: (theme) => theme.palette.text.secondary,
              height: '100%',
              mr: 2
            }}>
              <InfoIcon sx={{ verticalAlign: 'middle' }} />
            </Box>
            <Box>
              <Typography color="textSecondary" variant="subtitle1" align="left">
                {/* <ol style={{ margin: 1, paddingLeft: '3vw' }}> */}
                  <span>Each button is a table. Click on one to see individual seats and book or modify your reservation.</span><br />
                  <span>You won't be able to see the occupants of a full table.</span><br />
                  <span>Your seat choice isn't final and may be moved by teachers if neccessary.</span><br />
                  <span>This display is not entirely indicative of the actual layout.</span>
                {/* </ol> */}
              </Typography>
            </Box>
          </StyledBox>
        </Box>
      </Box>
    </Box>
  )
}