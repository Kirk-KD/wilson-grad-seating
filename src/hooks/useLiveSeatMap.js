import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase/firebase.js";

export default function useLiveSeatMap(tableId) {
  // { seatNum: UID }

  const [seatMap, setSeatMap] = useState({});

  useEffect(() => {
    if (tableId == null) return;

    const seatsRef = collection(db, "tables", tableId.toString(), "seats");

    const unsubscribe = onSnapshot(seatsRef, (snapshot) => {
      const data = {};
      snapshot.forEach((doc) => {
        data[doc.id] = doc.data().uid ?? null;
      });

      setSeatMap(data);
    });

    return () => unsubscribe();
  }, [tableId]);

  return seatMap;
}
