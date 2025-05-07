import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc
} from 'firebase/firestore';
import { db } from "./firebase.js";

const numTables = 54;
const numSeats = 10;
const validTableIds = Array.from({ length: numTables }, (_, i) => (i + 1).toString());
const validSeatNumbers = Array.from({ length: numSeats }, (_, i) => (i + 1).toString());

export function subscribeToTables(callback) {
  return onSnapshot(collection(db, 'tables'), snapshot => {
    const result = {};
    snapshot.docs.forEach(docSnap => {
      result[docSnap.id] = docSnap.data();
    });
    callback(result);
  });
}

export async function assignSeat({ tableId, seatNumber, uid }) {
  const tableRef = doc(db, 'tables', tableId);
  await updateDoc(tableRef, { [`seats.${seatNumber}`]: uid });
}

export async function vacateSeat({ tableId, seatNumber }) {
  const tableRef = doc(db, 'tables', tableId);
  await updateDoc(tableRef, { [`seats.${seatNumber}`]: null });
}

export async function getSeatOccupant({ tableId, seatNumber }) {
  const tableRef = doc(db, 'tables', tableId);
  const docSnap = await getDoc(tableRef);
  if (!docSnap.exists()) return null;
  const data = docSnap.data();
  return data.seats?.[seatNumber] ?? null;
}

export function isValidSeat({ tableId, seatNumber }) {
  return validTableIds.includes(tableId) && validSeatNumbers.includes(seatNumber);
}
