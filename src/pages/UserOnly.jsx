import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import { isInWhitelist } from '../utils/firebase/users.js';

export default function UserOnly({ children, admin }) {
  const { user, loading: authLoading } = useAuth();

  const [claims, setClaims] = useState(null);
  const [claimsLoading, setClaimsLoading] = useState(true);
  const [isWhitelisted, setIsWhitelisted] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setClaims({});
      setClaimsLoading(false);
      setIsWhitelisted(false);
      return;
    }

    user.getIdTokenResult()
      .then(tokenResult => {
        setClaims(tokenResult.claims);
        if (tokenResult.claims?.admin) {
          setIsWhitelisted(true);
        }
      })
      .catch(err => {
        console.error('Failed to fetch token claims', err);
      })
      .finally(() => {
        setClaimsLoading(false);
      });

    if (!claims?.admin) {
      isInWhitelist({ email: user.email })
        .then(result => {
          setIsWhitelisted(result);
        })
        .catch(err => {
          console.error('Failed to check whitelist', err);
          setIsWhitelisted(false);
        });
    }
  }, [user, authLoading, claims?.admin]);

  if (authLoading) return <div>Logging in…</div>;
  if (!user) return <Navigate to="/" replace />;
  if (claimsLoading || isWhitelisted === null) return <div>Checking permissions…</div>;
  if (!Boolean(claims?.admin) && !isWhitelisted) return <div>Not in whitelist</div>;
  if (Boolean(claims?.admin) != admin) return <Navigate to="/" replace />;

  return children;
}
