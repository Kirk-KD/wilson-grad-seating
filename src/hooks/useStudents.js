import { useEffect, useState } from 'react';
import { useAuth } from '../components/context/AuthContext.jsx';
import { subscribeToStudents } from '../utils/firebase/users.js';

export function useStudents() {
  const { user, loading: authLoading } = useAuth();
  const [students, setStudents] = useState({});

  useEffect(() => {
    if (authLoading) return; // waiting
    if (!user) { // signed out
      setUsers({});
      return;
    }

    const unsubscribe = subscribeToStudents(setStudents);
    return () => unsubscribe();
  }, []);

  return students;
}
