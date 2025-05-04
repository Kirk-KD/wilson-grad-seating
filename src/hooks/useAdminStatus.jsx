import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase/firebase";

export function useAdminStatus() {
  const [isAdmin, setIsAdmin] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult(true).then((idTokenResult) => {
          setIsAdmin(idTokenResult.claims.admin === true);
          setChecked(true);
        });
      } else {
        setIsAdmin(false);
        setChecked(true);
      }
    });

    return () => unsubscribe();
  }, []);

  return { isAdmin, checked };
}
