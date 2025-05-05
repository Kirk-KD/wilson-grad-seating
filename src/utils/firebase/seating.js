import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";

export async function getTableSeats(tableId) {
  const seatsRef = collection(db, "tables", tableId.toString(), "seats");
  const seatDocs = await getDocs(seatsRef);
  const seats = {};

  seatDocs.forEach(doc => {
    seats[doc.id] = doc.data();
  });

  return seats;
}
