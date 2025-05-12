import InfoIcon from '@mui/icons-material/Info';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSeatingSelector } from "../../context/SeatingSelectorContext";
import SeatingDisplay from "../../seating/SeatingDisplay";
import TableChip from "../../seating/TableChip";
import StyledBox from "../StyledBox";
import { Settings } from './Settings';

export default function SeatingEditor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    setSelectedTableId,
    setSelectedSeatNumber,
    setOpenTableDialog,
  } = useSeatingSelector();

  useEffect(() => {
    const tableId = searchParams.get('tableId');
    const seatNumber = searchParams.get('seatNumber');

    if (tableId !== null && seatNumber !== null) {
      setSelectedTableId(tableId);
      setSelectedSeatNumber(seatNumber);
      setOpenTableDialog(true);

      navigate('/admin', { replace: true });
    }
  }, [searchParams]);

  return (
    <Box position={"relative"} width={"100%"} px={2} paddingBottom={2}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: '4vh'
      }}>
        <Box sx={{
          width: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2
        }}>
          <StyledBox sx={{
            width: '100%'
          }}>
            <Typography sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1
            }} color="textSecondary" variant="subtitle1" align="left"><InfoIcon /> Each button is a table. Click on one to see and manage individual seats.</Typography>
          </StyledBox>
          
          <StyledBox sx={{
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <SeatingDisplay 
              renderTable={
                tableId => (
                  <TableChip
                    // the tableId is the button's OWN tableID, not props drilling
                    tableId={tableId}
                    // open the dialog and set the currently active table ID
                    onClick={(id, e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const anchor = { 
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                      };

                      setOpenTableDialog(true, anchor);
                      setSelectedTableId(id);
                    }}
                  />
                )
              }
            />
          </StyledBox>

          <Box height={2}></Box>

          <Settings />
        </Box>
      </Box>
    </Box>
  );
}