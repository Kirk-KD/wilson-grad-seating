import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app, auth, db } from './firebase.js';

const functions = getFunctions(app, "us-central1");

export function subscribeToWhitelist(callback) {
  const unsub = onSnapshot(collection(db, 'whitelist'), snapshot => {
    const whitelist = {};
    snapshot.docChanges().forEach(change => {
      const id = change.doc.id;
      if (change.type === 'removed') delete whitelist[id];
      else whitelist[id] = change.doc.data();
    });
    callback(whitelist);
  });

  return () => {
    unsub();
  };
}

export function adminSubscribeToStudents(callback) {
  const users = {};
  const infos = {};
  const choices = {};

  function emit() {
    const result = {};
    const allUids = Object.keys(users);

    allUids.forEach(uid => {
      result[uid] = {
        ...users[uid],
        ...infos[uid],
        ...choices[uid]
      };
    });

    callback(result);
  }

  const unsubUsers = onSnapshot(
    collection(db, 'student_users'),
    snapshot => {
      snapshot.docChanges().forEach(change => {
        const id = change.doc.id;
        if (change.type === 'removed') delete users[id];
        else users[id] = change.doc.data();
      });
      emit();
    }
  );

  const unsubChoices = onSnapshot(
    collection(db, 'student_choice'),
    snapshot => {
      snapshot.docChanges().forEach(change => {
        const id = change.doc.id;
        if (change.type === 'removed') delete choices[id];
        else choices[id] = change.doc.data();
      });
      emit();
    }
  );

  return () => {
    unsubUsers();
    unsubChoices();
  };
}

export function studentSubscribeToStudents(callback) {
  return adminSubscribeToStudents(callback);
}

export async function registerStudent({ email }) {
  const fn = httpsCallable(functions, 'createStudentAccount');
  const result = await fn({ email, isAdmin: false });
  return result.data;
}

export async function bulkRegisterStudents({ students }) {
  const fn = httpsCallable(functions, 'bulkCreateStudentAccounts');
  const result = await fn({ students });
  return result.data;
}

export async function deleteStudent({ uid }) {
  const fn = httpsCallable(functions, 'deleteStudentAccount');
  const result = await fn({ uid });
  return result.data;
}

export async function deleteStudentsBulk({ uids, emails }) {
  const fn = httpsCallable(functions, 'deleteStudentsBulk');
  const result = await fn({ uids, emails });
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

export async function setStudentSeatChoice({ uid, tableId, seatNumber }) {
  const choiceRef = doc(db, 'student_choice', uid);
  await updateDoc(choiceRef, { tableId, seatNumber });
}

export async function clearStudentSeatChoice({ uid }) {
  const choiceRef = doc(db, 'student_choice', uid);
  await updateDoc(choiceRef, { tableId: null, seatNumber: null });
}

export async function getStudentInfo({ uid }) {
  const infoRef = doc(db, 'student_users', uid);
  const docSnap = await getDoc(infoRef);

  if (!docSnap.exists()) throw new Error('Invalid student uid');

  const data = docSnap.data();

  return data;
}

export async function isInWhitelist({ email }) {
  const whitelistRef = doc(db, 'whitelist', email);
  const docSnap = await getDoc(whitelistRef);

  return docSnap.exists();
}