import fbAdmin from "firebase-admin";
import functions from "firebase-functions/v2";

fbAdmin.initializeApp();

const db = fbAdmin.firestore();

export const createStudentAccount = functions.https.onCall(async (req) => {
  if (!req.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be logged in.");
  }

  const { admin } = req.auth.token;
  if (!admin) {
    throw new functions.https.HttpsError("permission-denied", "Only admins can create student accounts.");
  }

  const { email, password, fname, lname, isAdmin } = req.data;

  try {
    const userRecord = await fbAdmin.auth().createUser({ email, password });
    const uid = userRecord.uid;

    if (isAdmin) {
      await fbAdmin.auth().setCustomUserClaims(uid, { admin: true });
      await db.collection("admin_users").doc(uid).set({ email });
    } else {
      await db.collection("student_info").doc(uid).set({ fname, lname });
      await db.collection("student_users").doc(uid).set({ email, oen: password });
      await db.collection("student_choice").doc(uid).set({ tableId: null, seatNumber: null });
    }

    return { success: true, uid };
  } catch (err) {
    if (err.code === 'auth/email-already-exists') {
      throw new functions.https.HttpsError("already-exists", "A user with that email already exists.");
    }
    if (err.code === 'auth/invalid-email') {
      throw new functions.https.HttpsError("invalid-argument", "Invalid email format.");
    }
    throw new functions.https.HttpsError("internal", err.message);
  }
});

export const deleteStudentAccount = functions.https.onCall(async (req) => {
  const callerUid = req.auth?.uid;
  if (!callerUid) throw new functions.https.HttpsError('unauthenticated');
  
  const caller = await fbAdmin.auth().getUser(callerUid);
  if (!caller.customClaims?.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Not an admin');
  }

  const db = fbAdmin.firestore();
  const collections = ["student_info", "student_users", "student_choice"];

  await Promise.all(
    collections.map(col => db.collection(col).doc(req.data.uid).delete())
  );

  await fbAdmin.auth().deleteUser(req.data.uid);
});

export const deleteStudentsBulk = functions.https.onCall(async (req) => {
  const callerUid = req.auth?.uid;
  if (!callerUid) throw new functions.https.HttpsError('unauthenticated');
  
  const caller = await fbAdmin.auth().getUser(callerUid);
  if (!caller.customClaims?.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Not an admin');
  }

  const { uids } = req.data;
  if (!Array.isArray(uids) || uids.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'uids must be a non-empty array');
  }

  const db = fbAdmin.firestore();
  const collections = ["student_info", "student_users", "student_choice"];

  const deletePromises = [];

  for (const uid of uids) {
    for (const col of collections) {
      const docRef = db.collection(col).doc(uid);
      deletePromises.push(docRef.delete().catch(() => null)); // Swallow not-found errors
    }

    deletePromises.push(fbAdmin.auth().deleteUser(uid).catch(() => null));
  }

  await Promise.all(deletePromises);

  return { status: 'success', deleted: uids.length };
});

export const deleteTeacherAccount = functions.https.onCall(async (req) => {
  const callerUid = req.auth?.uid;
  if (!callerUid) throw new functions.https.HttpsError('unauthenticated');
  
  const caller = await fbAdmin.auth().getUser(callerUid);
  if (!caller.customClaims?.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Not an admin');
  }

  await fbAdmin.auth().deleteUser(req.data.uid);
});
