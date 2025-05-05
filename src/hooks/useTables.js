import { useEffect, useState } from 'react';
import { useAuth } from '../components/context/AuthContext.jsx';
import { subscribeToTables } from "../utils/firebase/seating.js";

export function useTables() {
  const { user, loading: authLoading } = useAuth();
  const [tables, setTables] = useState({});

  useEffect(() => {
    if (authLoading) return; // waiting
    if (!user) { // signed out
      setTables({});
      return;
    }

    const unsubscribe = subscribeToTables(setTables);
    return () => unsubscribe();
  }, []);

  return tables;
}
