import { Dialog, useMediaQuery, useTheme } from "@mui/material";
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
      <BookingCard onClose={() => setOpenBookingCardDialog(false)} />
    </Dialog>
  );
}
