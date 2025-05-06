/**
 * A teacher can specifically:
 * - create student account
 * - delete student account
 * - create teacher account
 * - assign student to empty seat
 * - remove student from their own seat
 */

import { auth } from "../firebase/firebase.js";
import * as seating from "../firebase/seating.js";
import * as users from "../firebase/users.js";

export async function registerStudent({ fname, lname, email, oen }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');

  return await users.registerStudent({ fname, lname, email, oen });
}

export async function deleteStudent({ uid }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');

  return await users.deleteStudent({ uid });
}

export async function deleteStudentsBulk({ uids }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');

  return await users.deleteStudentsBulk({ uids });
}

export async function registerTeacher({ email, password }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');

  return await users.registerTeacher({ email, password });
}

export async function assignStudentToSeat({ tableId, seatNumber, uid }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');
  const valid = seating.isValidSeat({ tableId, seatNumber });
  if (!valid) throw new Error('Invalid table/seat');
  const targetSeatOccupant = await seating.getSeatOccupant({ tableId, seatNumber });
  if (targetSeatOccupant != null) throw new Error('Seat is occupied');
  
  return await seating.assignSeat({ tableId, seatNumber, uid });
}

export async function vacateSeat({ tableId, seatNumber }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');
  const valid = seating.isValidSeat({ tableId, seatNumber });
  if (!valid) throw new Error('Invalid table/seat');

  return await seating.vacateSeat({ tableId, seatNumber });
}

export async function vacateStudentFromTheirSeat({ uid }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');

  const seatInfo = await users.getStudentSeatChoice({ uid });
  if (seatInfo.seatNumber == null) return;

  return await vacateSeat(seatInfo);
}
