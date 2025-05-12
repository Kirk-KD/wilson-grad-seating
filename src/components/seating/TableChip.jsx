import { Badge, Typography, useTheme } from "@mui/material";
import AnimatedContainer from "../AnimatedContainer";
import { useTablesContext } from "../context/TablesContext";
import StyledTableChipButton from "./StyledTableChipButton";

export default function TableChip({ tableId, onClick }) {
  const theme = useTheme();
  const tables = useTablesContext();

  const table = tables[tableId];
  const occupied = table
    ? Object.values(table.seats || {}).filter(uid => uid != null).length
    : 0;

  const isAvailable = occupied < 10;

  const numericId = parseInt(tableId, 10) || 0;
  const delay = numericId * 10;

  return (
      <Badge
        badgeContent={occupied}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: theme.palette.secondary.main,
            color: '#fff',
            top: 4,
            right: 4,
          },
        }}
      >
        <AnimatedContainer delay={delay}>
          <StyledTableChipButton
            onClick={(e) => onClick(tableId, e)}
            bgColor={
              isAvailable
                ? theme.palette.primary.light
                : theme.palette.grey[200]
            }
            hoverColor={
              isAvailable
                ? theme.palette.primary.dark
                : theme.palette.grey[300]
            }
          >
            <Typography variant="h6" fontSize={"1.2em"} fontFamily={"'Cal Sans', sans-serif"}>{tableId}</Typography>
          </StyledTableChipButton>
        </AnimatedContainer>
      </Badge>
  );
}