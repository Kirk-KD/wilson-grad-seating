import { createContext, useContext, useState } from 'react';

const SeatingSelectorContext = createContext(null);

export function SeatingSelectorProvider({ children }) {
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [selectedSeatNumber, setSelectedSeatNumber] = useState(null);

  return (
    <SeatingSelectorContext.Provider
      value={{
        selectedTableId,
        setSelectedTableId,
        selectedSeatNumber,
        setSelectedSeatNumber,
      }}
    >
      {children}
    </SeatingSelectorContext.Provider>
  );
}

export function useSeatingEditor() {
  const context = useContext(SeatingSelectorContext);
  if (!context) {
    throw new Error('useSeatingEditor must be used within a SeatingSelectorProvider');
  }
  return context;
}
