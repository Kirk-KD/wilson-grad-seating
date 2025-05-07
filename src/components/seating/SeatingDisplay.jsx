import { Typography } from "@mui/material";
import AlternatingGrid from "./AlternatingGrid";
import StyledSeatingDisplayBox from "./StyledSeatingDisplayBox";
import StyledSeparatorBox from "./StyledSeparatorBox";

export default function SeatingDisplay({ renderTable, sx }) {
  const half = 27;
  const firstHalfIds = Array.from({ length: half }, (_, i) => (i + 1).toString());
  const secondHalfIds = Array.from({ length: half }, (_, i) => (half + i + 1).toString());

  return (
    <StyledSeatingDisplayBox sx={sx}>
      <AlternatingGrid
        items={firstHalfIds}
        renderItem={(id, idx) => renderTable(id)}
        getKey={(id, idx) => id}
        pattern={[5, 4]}
      />

      <StyledSeparatorBox>
        <Typography variant="p" color="textSecondary" sx={{
          writingMode: {
            xs: 'horizontal-tb',
            md: 'vertical-rl'
          },
          textOrientation: {
            xs: 'mixed',
            md: 'upright'
          },
        }}>Dance Floor & DJ</Typography>
      </StyledSeparatorBox>

      <AlternatingGrid
        items={secondHalfIds}
        renderItem={(id, idx) => renderTable(id)}
        getKey={(id, idx) => id}
        pattern={[4, 5]}
      />
    </StyledSeatingDisplayBox>
  )
}