import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app, auth, db } from './firebase.js';

const functions = getFunctions(app, "us-central1");

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

  const unsubInfos = onSnapshot(
    collection(db, 'student_info'),
    snapshot => {
      snapshot.docChanges().forEach(change => {
        const id = change.doc.id;
        if (change.type === 'removed') delete infos[id];
        else infos[id] = change.doc.data();
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
    unsubInfos();
    unsubChoices();
  };
}

export function studentSubscribeToStudents(callback) {
  const infos = {};
  const choices = {};

  function emit() {
    const result = {};
    const allUids = Object.keys(infos);

    allUids.forEach(uid => {
      result[uid] = {
        ...infos[uid],
        ...choices[uid]
      };
    });

    callback(result);
  }

  const unsubInfos = onSnapshot(
    collection(db, 'student_info'),
    snapshot => {
      snapshot.docChanges().forEach(change => {
        const id = change.doc.id;
        if (change.type === 'removed') delete infos[id];
        else infos[id] = change.doc.data();
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
    unsubInfos();
    unsubChoices();
  };
}

export async function registerStudent({ fname, lname, email, oen }) {
  const fn = httpsCallable(functions, 'createStudentAccount');
  const result = await fn({ fname, lname, email, password: oen, isAdmin: false });
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

export async function deleteStudentsBulk({ uids }) {
  const fn = httpsCallable(functions, 'deleteStudentsBulk');
  const result = await fn({ uids });
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
  const infoRef = doc(db, 'student_info', uid);
  const docSnap = await getDoc(infoRef);

  if (!docSnap.exists()) throw new Error('Invalid student uid');

  const data = docSnap.data();

  return { fname: data.fname, lname: data.lname };
}

export async function setStudentAllowBook({ uid, allowBook }) {
  const infoRef = doc(db, 'student_info', uid);
  await updateDoc(infoRef, { allowBook });
}
