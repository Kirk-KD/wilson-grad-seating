import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext.jsx";
import { subscribeToWhitelist } from "../utils/firebase/users.js";

export function useWhitelist() {
  const { user, loading } = useAuth();
  const [whitelist, setWhitelist] = useState({});

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setWhitelist({});
      return;
    }

    const unsubscribe = subscribeToWhitelist(setWhitelist);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [loading, user]);

  return whitelist;
}