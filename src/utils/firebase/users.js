import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app, auth, db } from './firebase.js';

const functions = getFunctions(app, "us-central1");

export function subscribeToStudents(callback) {
  return onSnapshot(collection(db, 'student_users'), async snapshot => {
    const studentPromises = snapshot.docs.map(async userSnap => {
      const infoSnap = await getDoc(doc(db, 'student_info', userSnap.id));
      const choiceSnap = await getDoc(doc(db, 'student_choice', userSnap.id));
      return [
        userSnap.id,
        {
          ...userSnap.data(), // 'student_users', email and oen
          ...(infoSnap.exists() ? infoSnap.data() : {}), // 'student_info', fname and lname
          ...(choiceSnap.exists() ? choiceSnap.data() : {}) // 'student_choice', table and seat
        }
      ];
    });
    const entries = await Promise.all(studentPromises);
    const result = Object.fromEntries(entries);
    callback(result);
  });
}

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