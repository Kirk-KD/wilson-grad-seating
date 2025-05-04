import { useMediaQuery, useTheme } from '@mui/material';
import { Grid } from "@mui/system";

export default function AlternatingGrid({ items, renderItem, getKey, pattern }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const groups = [];
  let cursor = 0;
  let patIdx = 0;

  while (cursor < items.length) {
    const size = pattern[patIdx % pattern.length];
    const group = items.slice(cursor, cursor + size);
    
    if (isMdUp) groups.push([...group].reverse());
    else groups.push(group);
    
    cursor += size;
    patIdx++;
  }

  return (
    <Grid 
      container 
      direction={isMdUp ? "row" : "column"}
      spacing={1}
      alignItems="center"
      sx={{
        gap: 2,
        width: "fit-content",
        height: "fit-content",
      }}
    >
      {groups.map((group, groupIdx) => (
        <Grid
          key={groupIdx}
          container
          direction={isMdUp ? "column" : "row"}
          wrap="nowrap"
          sx={{ 
            width: "auto",
            ...(isMdUp 
              ? { rowGap: 2 } 
              : { columnGap: 2 }
            )
          }}
        >
          {group.map((item, idx) => (
            <Grid
              key={getKey(item, idx)}
              sx={{ flex: "0 0 auto" }}
            >
              {renderItem(item, idx)}
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}