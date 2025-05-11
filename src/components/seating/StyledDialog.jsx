import { Backdrop, Dialog } from "@mui/material";
import { styled } from "@mui/system";

// Custom blurred backdrop
const BlurBackdrop = styled(Backdrop)(({ theme }) => ({
  backdropFilter: "blur(5px)",
  transition: "backdrop-filter 0.3s ease-in-out",
}));

// Styled dialog
const StyledDialogRoot = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

// Merge passed-in slots and slotProps with defaults
const StyledDialog = ({ slots = {}, slotProps = {}, ...props }) => {
  return (
    <StyledDialogRoot
      {...props}
      slots={{ backdrop: BlurBackdrop, ...slots }}
      slotProps={{
        backdrop: { timeout: 300, ...(slotProps.backdrop || {}) },
        ...slotProps,
      }}
    />
  );
};

export default StyledDialog;
