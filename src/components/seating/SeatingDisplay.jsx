import { Typography } from "@mui/material";
import AlternatingGrid from "./AlternatingGrid";
import StyledSeatingDisplayPaper from "./StyledSeatingDisplayPaper";
import StyledSeparatorBox from "./StyledSeparatorBox";

export default function SeatingDisplay({ renderTable }) {
  const half = 27;
  const firstHalfIds = Array.from({ length: half }, (_, i) => i);
  const secondHalfIds = Array.from({ length: half }, (_, i) => half + i );

  return (
    <StyledSeatingDisplayPaper elevation={1}>
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
    </StyledSeatingDisplayPaper>
  )
}