import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc
} from 'firebase/firestore';
import { db } from "./firebase.js";

const numTables = 54;
const numSeats = 10;
const validTableIds = Array.from({ length: numTables }, (_, i) => (i + 1).toString());
const validSeatNumbers = Array.from({ length: numSeats }, (_, i) => (i + 1).toString());

export function subscribeToTables(callback) {
  return onSnapshot(collection(db, 'tables'), async snapshot => {
    const tablePromises = snapshot.docs.map(async docSnap => {
      const seatsSnapshot = await getDocs(collection(db, 'tables', docSnap.id, 'seats'));
      const seats = {};
      seatsSnapshot.forEach(seatDoc => {
        seats[seatDoc.id] = seatDoc.data();
      });
      return [docSnap.id, { ...docSnap.data(), seats }];
    });
    const entries = await Promise.all(tablePromises);
    const result = Object.fromEntries(entries);
    callback(result);
  });
}

export async function assignSeat({ tableId, seatNumber, uid }) {
  const tableRef = doc(db, 'tables', tableId);
  await updateDoc(tableRef, {
    [seatNumber]: uid
  }, { merge: true });
}

export async function vacateSeat({ tableId, seatNumber }) {
  const tableRef = doc(db, 'tables', tableId);
  await updateDoc(tableRef, {
    [seatNumber]: null
  }, { merge: true });
}

export async function getSeatOccupant({ tableId, seatNumber }) {
  const tableRef = doc(db, 'tables', tableId);
  const docSnap = await getDoc(tableRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  return data[seatNumber] ?? null;
}

export function isValidSeat({ tableId, seatNumber }) {
  return validTableIds.includes(tableId) && validSeatNumbers.includes(seatNumber);
}
