import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app, auth, db } from './firebase.js';

const functions = getFunctions(app, "us-central1");

export function subscribeToWhitelist(callback) {
  const unsub = onSnapshot(collection(db, 'whitelist'), snapshot => {
    const whitelist = {};
    snapshot.docChanges().forEach(change => {
      const email = change.doc.id;
      if (change.type === 'removed') delete whitelist[email];
      else whitelist[email] = change.doc.data();
    });
    callback(whitelist);
  });

  return () => {
    unsub();
  };
}

export function adminSubscribeToStudents(callback) {
  const whitelist = {};
  const users = {};
  const infos = {};
  const choices = {};

  function emit() {
    const result = {};
    const allEmails = Object.keys(users);

    allEmails.forEach(email => {
      result[email] = {
        ...users[email],
        ...infos[email],
        ...choices[email]
      };
    });

    callback(result);
  }

  const unsubUsers = onSnapshot(
    collection(db, 'student_users'),
    snapshot => {
      snapshot.docChanges().forEach(change => {
        const email = change.doc.id;
        if (change.type === 'removed') delete users[email];
        else users[email] = change.doc.data();
      });
      emit();
    }
  );

  const unsubChoices = onSnapshot(
    collection(db, 'student_choice'),
    snapshot => {
      snapshot.docChanges().forEach(change => {
        const email = change.doc.id;
        if (change.type === 'removed') delete choices[email];
        else choices[email] = change.doc.data();
      });
      emit();
    }
  );

  const unsubWhitelist = onSnapshot(
    collection(db, 'whitelist'),
    snapshot => {
      snapshot.docChanges().forEach(change => {
        const email = change.doc.id;
        if (change.type === 'removed') delete whitelist[email];
        else whitelist[email] = change.doc.data();
      });
      emit();
    }
  );

  return () => {
    unsubUsers();
    unsubChoices();
    unsubWhitelist();
  };
}

export function studentSubscribeToStudents(callback) {
  return adminSubscribeToStudents(callback);
}

export function setStudentName({ email, fname, lname }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const userRef = doc(db, 'student_users', email);
  return updateDoc(userRef, { fname, lname });
}

export async function registerStudent({ email }) {
  const fn = httpsCallable(functions, 'createStudentAccount');
  const result = await fn({ email, isAdmin: false });
  return result.data;
}

export async function bulkRegisterStudents({ emails }) {
  const fn = httpsCallable(functions, 'bulkCreateStudentAccounts');
  const result = await fn({ emails });
  return result.data;
}

export async function deleteStudent({ email }) {
  const fn = httpsCallable(functions, 'deleteStudentAccount');
  const result = await fn({ email });
  return result.data;
}

export async function deleteStudentsBulk({ emails }) {
  const fn = httpsCallable(functions, 'deleteStudentsBulk');
  const result = await fn({ emails });
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

export async function getStudentSeatChoice({ email }) {
  const choiceRef = doc(db, 'student_choice', email);
  const docSnap = await getDoc(choiceRef);

  if (!docSnap.exists()) return { tableId: null, seatNumber: null };
  
  const data = docSnap.data();

  return { tableId: data.tableId, seatNumber: data.seatNumber };
}

export async function setStudentSeatChoice({ email, tableId, seatNumber }) {
  const choiceRef = doc(db, 'student_choice', email);
  await updateDoc(choiceRef, { tableId, seatNumber });
}

export async function clearStudentSeatChoice({ email }) {
  const choiceRef = doc(db, 'student_choice', email);
  await updateDoc(choiceRef, { tableId: null, seatNumber: null });
}

export async function getStudentInfo({ email }) {
  const infoRef = doc(db, 'student_users', email);
  const docSnap = await getDoc(infoRef);

  if (!docSnap.exists()) throw new Error('Invalid student email');

  const data = docSnap.data();

  return data;
}

export async function isInWhitelist({ email }) {
  const whitelistRef = doc(db, 'whitelist', email);
  const docSnap = await getDoc(whitelistRef);

  return docSnap.exists();
}