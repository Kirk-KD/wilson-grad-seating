import { alpha, Typography, useTheme } from "@mui/material";
import useLiveSeatMap from "../../hooks/useLiveSeatMap";
import StyledTableChipButton from "./StyledTableChipButton";

export default function TableChip({ tableId, onClick }) {
  const theme = useTheme();
  const seatMap = useLiveSeatMap(tableId.toString());

  const countOccupancy = () => {
    return Object.values(seatMap).filter(uid => uid != null).length;
  }

  return (
    <StyledTableChipButton
      onClick={() => onClick(tableId)}
      bgColor={countOccupancy() < 10 ? alpha(theme.palette.success.main, 0.5) : theme.palette.grey[200]}
      hoverColor={countOccupancy() < 10 ? alpha(theme.palette.success.light, 0.5) : theme.palette.grey[300]}
    >
      <Typography variant="h6">{ tableId }</Typography>
    </StyledTableChipButton>
  )
}