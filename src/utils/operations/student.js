/**
 * A student can specifically:
 * - Give up their own seat
 * - Claim an unoccupied seat
 * - Get their own seat choice
 */

import { auth } from "../firebase/firebase.js";
import * as seating from "../firebase/seating.js";
import * as users from "../firebase/users.js";

export async function getOwnSeatChoice() {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const isTeacher = await users.isCurrentUserTeacher();
  if (isTeacher) throw new Error('Not a student');

  return await users.getStudentSeatChoice({ uid: user.uid });
}

export async function claimUnoccupiedSeat({ tableId, seatNumber }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const valid = seating.isValidSeat({ tableId, seatNumber });
  if (!valid) throw new Error('Invalid table/seat');

  const isTeacher = await users.isCurrentUserTeacher();
  if (isTeacher) throw new Error('Not a student');

  const targetSeatOccupant = await seating.getSeatOccupant({ tableId, seatNumber });
  if (targetSeatOccupant != null) throw new Error('Seat is occupied');

  await vacateOwnSeat();
  await users.setStudentSeatChoice({ tableId, seatNumber, uid: user.uid });
  await seating.assignSeat({ tableId, seatNumber, uid: user.uid });
}

export async function vacateOwnSeat() {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const isTeacher = await users.isCurrentUserTeacher();
  if (isTeacher) throw new Error('Not a student');

  const { tableId: oldTableId, seatNumber: oldSeatNumber } = await getOwnSeatChoice();
  if (oldTableId !== null) {
    await seating.vacateSeat({ tableId: oldTableId, seatNumber: oldSeatNumber });
    await users.clearStudentSeatChoice({ uid: user.uid });
  }
}
