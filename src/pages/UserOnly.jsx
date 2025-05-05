import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';

export default function UserOnly({ children, admin }) {
  const { user, loading: authLoading } = useAuth();

  const [claims, setClaims] = useState(null);
  const [claimsLoading, setClaimsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setClaims({});
      setClaimsLoading(false);
      return;
    }
    
    user.getIdTokenResult()
      .then(tokenResult => {
        setClaims(tokenResult.claims);
      })
      .catch(err => {
        console.error('Failed to fetch token claims', err);
      })
      .finally(() => {
        setClaimsLoading(false);
      });
  }, [user]);

  if (authLoading) return <div>Logging in…</div>;
  if (!user) return <Navigate to="/" replace />;
  if (claimsLoading) return <div>Checking permissions…</div>;
  if (claims?.admin != admin) return <Navigate to="/" replace />;

  return children;
}
