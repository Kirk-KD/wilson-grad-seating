import { Box } from "@mui/material";
import { styled } from "@mui/system";

const ResponsiveBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  }
}));

export default function StyledBox({ children, sx }) {
  return (
    <ResponsiveBox sx={sx}>
      {children}
    </ResponsiveBox>
  );
}