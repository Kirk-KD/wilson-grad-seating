import { createContext, useContext } from 'react';
import { useTables } from '../../hooks/useTables';

const TablesContext = createContext(null);

export function TablesProvider({ children }) {
  const tables = useTables();
  return (
    <TablesContext.Provider value={tables}>
      {children}
    </TablesContext.Provider>
  );
}

export function useTablesContext() {
  const context = useContext(TablesContext);
  if (context === null) {
    throw new Error('useTablesContext must be used within a TablesProvider');
  }
  return context;
}
