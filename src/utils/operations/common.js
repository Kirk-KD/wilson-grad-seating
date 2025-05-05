/**
 * Anyone can:
 * - Get a student's seat choice
 * - Get a student's info (fname, lname)
 * - Get the occupant of a seat
 */

import { auth } from "../firebase/firebase.js";
import * as seating from "../firebase/seating.js";
import * as users from "../firebase/users.js";

export async function getSeatOccupant({ tableId, seatNumber }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const valid = seating.isValidSeat({ tableId, seatNumber });
  if (!valid) throw new Error('Invalid table/seat');

  return await seating.getSeatOccupant({ tableId, seatNumber });
}

export async function getStudentSeatChoice({ uid }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  return await users.getStudentSeatChoice({ uid });
}

export async function getStudentInfo({ uid }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  return await users.getStudentInfo({ uid });
}
