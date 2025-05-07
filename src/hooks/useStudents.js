import { useEffect, useState } from 'react';
import { useAuth } from '../components/context/AuthContext.jsx';
import { adminSubscribeToStudents, studentSubscribeToStudents } from '../utils/firebase/users.js';

export function useStudents() {
  const { user, loading: authLoading } = useAuth();
  const [students, setStudents] = useState({});

  useEffect(() => {
    if (authLoading) return;
  
    if (!user) {
      setStudents({});
      return;
    }
  
    let unsubscribe;
  
    (async () => {
      const tokenResult = await user.getIdTokenResult();
      const isAdmin = tokenResult.claims.admin === true;
  
      unsubscribe = isAdmin
        ? adminSubscribeToStudents(setStudents)
        : studentSubscribeToStudents(setStudents);
    })();
  
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [authLoading, user]);  

  return students;
}
