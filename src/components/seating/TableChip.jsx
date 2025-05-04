import { Typography } from "@mui/material";
import StyledTableChipButton from "./StyledTableChipButton";

export default function TableChip({ tableId, onClick }) {
  return (
    <StyledTableChipButton onClick={() => onClick(tableId)}>
      <Typography variant="h6">{ tableId }</Typography>
    </StyledTableChipButton>
  )
}