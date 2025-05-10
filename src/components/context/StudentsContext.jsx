import { createContext, useContext } from "react";
import { useStudents } from "../../hooks/useStudents";

const StudentsContext = createContext(null);

export function StudentsProvider({ children }) {
  // email: { email, fname, lname, seatNumber, tableId, allowBooking }
  const students = useStudents();
  return (
    <StudentsContext.Provider value={students}>
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudentsContext() {
  const context = useContext(StudentsContext);
  if (context === null) {
    throw new Error('useStudentsContext must be used within a StudentsProvider');
  }
  return context;
}