import { Tooltip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/system";
import AnimatedContainer from "../AnimatedContainer";
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

  const numericId = parseInt(seatNumber, 10) || 0;
  const delay = numericId * 10;

  return (
    <Tooltip title={ hover }>
      <AnimatedContainer delay={delay}>
        <StyledSeatChipButton
          onClick={() => onClick(seatNumber)}
          bgColor={ selectedSeatNumber == seatNumber ? theme.palette.secondary.light : (occupied ? theme.palette.grey[200] : alpha(theme.palette.success.main, 0.5)) }
          hoverColor={ selectedSeatNumber == seatNumber ? theme.palette.secondary.light : (occupied ? theme.palette.grey[300] : alpha(theme.palette.success.light, 0.5)) }
        >
          <Typography variant="h6" fontSize={"1.2em"}>{ text }</Typography>
        </StyledSeatChipButton>
      </AnimatedContainer>
    </Tooltip>
  )
}