import { alpha, Typography, useTheme } from "@mui/material";
import { useTablesContext } from "../context/TablesContext";
import StyledTableChipButton from "./StyledTableChipButton";

export default function TableChip({ tableId, onClick }) {
  const theme = useTheme();
  const tables = useTablesContext();

  const table = tables[tableId];
  const occupied = table
    ? Object.values(table.seats || {}).filter(s => s.uid != null).length
    : 0;

  const isAvailable = occupied < 10;

  return (
    <StyledTableChipButton
      onClick={() => onClick(tableId)}
      bgColor={isAvailable ? alpha(theme.palette.success.main, 0.5) : theme.palette.grey[200]}
      hoverColor={isAvailable ? alpha(theme.palette.success.light, 0.5) : theme.palette.grey[300]}
    >
      <Typography variant="h6">{ tableId }</Typography>
    </StyledTableChipButton>
  )
}