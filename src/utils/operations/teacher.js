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

export async function registerStudent({ email }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');

  return await users.registerStudent({ email });
}

export async function deleteStudent({ email }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');

  const seat = await users.getStudentSeatChoice({ email });
  if (seat.tableId != null) await seating.vacateSeat(seat);
  await users.deleteStudent({ email });
}

export async function deleteStudentsBulk({ emails }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');

  for (const email of emails) {
    const seat = await users.getStudentSeatChoice({ email });
    if (seat.tableId != null) await seating.vacateSeat(seat);
  }

  return await users.deleteStudentsBulk({ emails });
}

export async function registerTeacher({ email, password }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');

  return await users.registerTeacher({ email, password });
}

export async function assignStudentToSeat({ tableId, seatNumber, email }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');
  const valid = seating.isValidSeat({ tableId, seatNumber });
  if (!valid) throw new Error('Invalid table/seat');
  const targetSeatOccupant = await seating.getSeatOccupant({ tableId, seatNumber });
  if (targetSeatOccupant != null) throw new Error('Seat is occupied');

  await seating.assignSeat({ tableId, seatNumber, email });
  await users.setStudentSeatChoice({ email, tableId, seatNumber });
}

export async function vacateSeat({ tableId, seatNumber }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');
  const valid = seating.isValidSeat({ tableId, seatNumber });
  if (!valid) throw new Error('Invalid table/seat');

  const seatOwnerEmail = await seating.getSeatOccupant({ tableId, seatNumber });

  await seating.vacateSeat({ tableId, seatNumber });
  if (seatOwnerEmail != null) await users.clearStudentSeatChoice({ email: seatOwnerEmail });
}

export async function vacateStudentFromTheirSeat({ email }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');

  const seatInfo = await users.getStudentSeatChoice({ email });
  if (seatInfo.seatNumber == null) return;

  return await vacateSeat(seatInfo);
}

export async function bulkRegisterStudents({ students }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const isTeacher = await users.isCurrentUserTeacher();
  if (!isTeacher) throw new Error('Not a teacher');

  return await users.bulkRegisterStudents({ students });
}
