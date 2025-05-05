import { Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/system";
import { useSeatingEditor } from "../context/SeatingSelectorContext";
import StyledSeatChipButton from "./StyledSeatChipButton";

export default function SeatChip({ seatNumber, occupied, onClick }) {
  const theme = useTheme();
  const {
    selectedTableId,
    setSelectedTableId,
    selectedSeatNumber,
    setSelectedSeatNumber,
  } = useSeatingEditor();

  return (
    <StyledSeatChipButton
      onClick={() => onClick(seatNumber)}
      bgColor={ selectedSeatNumber == seatNumber ? theme.palette.secondary.light : (occupied ? theme.palette.grey[200] : alpha(theme.palette.success.main, 0.5)) }
      hoverColor={ selectedSeatNumber == seatNumber ? theme.palette.secondary.light : (occupied ? theme.palette.grey[300] : alpha(theme.palette.success.light, 0.5)) }
    >
      <Typography variant="h6">{ seatNumber }</Typography>
    </StyledSeatChipButton>
  )
}