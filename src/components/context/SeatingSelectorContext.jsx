import { createContext, useContext, useState } from 'react';

const SeatingSelectorContext = createContext(null);

export function SeatingSelectorProvider({ children }) {
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [selectedSeatNumber, setSelectedSeatNumber] = useState(null);
  const [openTableDialog, setOpenTableDialog] = useState(false);

  return (
    <SeatingSelectorContext.Provider
      value={{
        selectedTableId,
        setSelectedTableId,
        selectedSeatNumber,
        setSelectedSeatNumber,
        openTableDialog, 
        setOpenTableDialog
      }}
    >
      {children}
    </SeatingSelectorContext.Provider>
  );
}

export function useSeatingSelector() {
  const context = useContext(SeatingSelectorContext);
  if (!context) {
    throw new Error('useSeatingSelector must be used within a SeatingSelectorProvider');
  }
  return context;
}
