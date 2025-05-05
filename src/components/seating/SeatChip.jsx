import { Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/system";
import StyledSeatChipButton from "./StyledSeatChipButton";

export default function SeatChip({ selectedSeat, seatNumber, occupied, onClick }) {
  const theme = useTheme();

  return (
    <StyledSeatChipButton
      onClick={() => onClick(seatNumber)}
      bgColor={ selectedSeat == seatNumber ? theme.palette.secondary.light : (occupied ? theme.palette.grey[200] : alpha(theme.palette.success.main, 0.5)) }
      hoverColor={ selectedSeat == seatNumber ? theme.palette.secondary.light : (occupied ? theme.palette.grey[300] : alpha(theme.palette.success.light, 0.5)) }
    >
      <Typography variant="h6">{ seatNumber }</Typography>
    </StyledSeatChipButton>
  )
}