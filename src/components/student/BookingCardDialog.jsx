import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useStudentSeatBooking } from "../context/StudentSeatBookingContext";
import BookingCard from "./BookingCard";

export default function BookingCardDialog() {
  const { openBookingCardDialog, setOpenBookingCardDialog } = useStudentSeatBooking();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={openBookingCardDialog}
      onClose={() => setOpenBookingCardDialog(false)}
      fullScreen={fullScreen}
    >
      {fullScreen && (
        <DialogTitle sx={{ m: 0, p: 1 }}>
          <IconButton
            aria-label="close"
            onClick={() => setOpenBookingCardDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <BookingCard />
    </Dialog>
  );
}
