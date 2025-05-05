import { doc, getDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth, db } from './firebase.js';

const functions = getFunctions();

export async function registerStudent({ fname, lname, email, oen }) {
  const fn = httpsCallable(functions, 'createStudentAccount');
  const result = await fn({ fname, lname, email, password: oen, isAdmin: false });
  return result.data;
}

export async function deleteStudent({ uid }) {
  const fn = httpsCallable(functions, 'deleteStudentAccount');
  const result = await fn({ uid });
  return result.data;
}

export async function registerTeacher({ email, password }) {
  const fn = httpsCallable(functions, 'createStudentAccount'); // this cloud function works with both teacher and student accounts
  const result = await fn({ email, password, isAdmin: true });
  return result.data;
}

export async function deleteTeacher({ uid }) {
  const fn = httpsCallable(functions, 'deleteTeacherAccount');
  const result = await fn({ uid });
  return result.data;
}

export async function isCurrentUserTeacher() {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const res = await user.getIdTokenResult();
  return !!res.claims.admin;
}

export async function getStudentSeatChoice({ uid }) {
  const choiceRef = doc(db, 'student_choice', uid);
  const docSnap = await getDoc(choiceRef);

  if (!docSnap.exists()) throw new Error('Invalid student uid');
  
  const data = docSnap.data();

  return { tableId: data.tableId, seatNumber: data.seatNumber };
}

export async function getStudentInfo({ uid }) {
  const infoRef = doc(db, 'student_info', uid);
  const docSnap = await getDoc(infoRef);

  if (!docSnap.exists()) throw new Error('Invalid student uid');

  const data = docSnap.data();

  return { fname: data.fname, lname: data.lname };
}