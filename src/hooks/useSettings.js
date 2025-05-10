import { useEffect, useState } from 'react';
import { useAuth } from '../components/context/AuthContext.jsx';
import { subscribeToSettings } from '../utils/firebase/seating.js';

export function useSettings() {
  const { user, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    if (authLoading || !user) {
      setSettings({});
      return;
    }
    const unsubscribe = subscribeToSettings(setSettings);
    return () => unsubscribe && unsubscribe();
  }, [authLoading, user]);

  return settings;
}
