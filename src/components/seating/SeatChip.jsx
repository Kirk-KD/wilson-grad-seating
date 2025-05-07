import { Tooltip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/system";
import { useSeatingSelector } from "../context/SeatingSelectorContext";
import { useStudentsContext } from "../context/StudentsContext";
import StyledSeatChipButton from "./StyledSeatChipButton";

export default function SeatChip({ seatNumber, occupant, onClick }) {
  const theme = useTheme();
  const {
    selectedSeatNumber,
  } = useSeatingSelector();
  const students = useStudentsContext();

  const occupied = occupant != null;
  const student = students[occupant];

  const text = occupied ? `${student.fname.charAt(0).toUpperCase()}${student.lname.charAt(0).toUpperCase()}` : seatNumber;
  const hover = occupied ? `${student.fname.charAt(0).toUpperCase() + student.fname.slice(1)} ${student.lname.charAt(0).toUpperCase() + student.lname.slice(1)}` : "Unoccupied";

  return (
    <Tooltip title={ hover }>
      <StyledSeatChipButton
        onClick={() => onClick(seatNumber)}
        bgColor={ selectedSeatNumber == seatNumber ? theme.palette.secondary.light : (occupied ? theme.palette.grey[200] : alpha(theme.palette.success.main, 0.5)) }
        hoverColor={ selectedSeatNumber == seatNumber ? theme.palette.secondary.light : (occupied ? theme.palette.grey[300] : alpha(theme.palette.success.light, 0.5)) }
      >
        <Typography variant="h6">{ text }</Typography>
      </StyledSeatChipButton>
    </Tooltip>
  )
}