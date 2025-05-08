import { createContext, useContext, useState } from 'react';

const StudentSeatBookingContext = createContext(null);

export function StudentSeatBookingProvider({ children }) {
  const [openBookConfirmationDialog, setOpenBookConfirmationDialog] = useState(false);
  const [openUnbookConfirmationDialog, setUnbookBookConfirmationDialog] = useState(false);
  const [openBookingCardDialog, setOpenBookingCardDialog] = useState(false);

  return (
    <StudentSeatBookingContext.Provider
      value={{
        openBookConfirmationDialog, setOpenBookConfirmationDialog,
        openUnbookConfirmationDialog, setUnbookBookConfirmationDialog,
        openBookingCardDialog, setOpenBookingCardDialog
      }}
    >
      {children}
    </StudentSeatBookingContext.Provider>
  );
}

export function useStudentSeatBooking() {
  const context = useContext(StudentSeatBookingContext);
  if (!context) {
    throw new Error('useStudentSeatBooking must be used within a StudentSeatBookingProvider');
  }
  return context;
}
