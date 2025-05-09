import fbAdmin from "firebase-admin";
import * as functionsv1 from "firebase-functions/v1";
import functionsv2 from "firebase-functions/v2";

fbAdmin.initializeApp();

const db = fbAdmin.firestore();

export const onUserCreate = functionsv1.auth.user().onCreate(async (user) => {
  const email = user.email;

  if (!email) {
    throw new Error("invalid-argument: Email is required.");
  }

  // Check if the provider is Google
  const provider = user.providerData?.[0]?.providerId;
  if (provider !== "google.com") {
    return;
  }

  const whitelistDoc = await db.collection("whitelist").doc(email).get();

  if (!whitelistDoc.exists) {
    return;
  }

  const batch = db.batch();

  const studentUserRef = db.collection("student_users").doc(user.uid);
  batch.set(studentUserRef, { email, allowBooking: true });

  const studentChoiceRef = db.collection("student_choice").doc(user.uid);
  batch.set(studentChoiceRef, { tableId: null, seatNumber: null });

  await batch.commit();
});

export const createStudentAccount = functionsv2.https.onCall(async (req) => {
  if (!req.auth) {
    throw new functionsv2.https.HttpsError("unauthenticated", "You must be logged in.");
  }

  const { admin } = req.auth.token;
  if (!admin) {
    throw new functionsv2.https.HttpsError("permission-denied", "Only admins can create student accounts.");
  }

  const { email, isAdmin, password } = req.data;

  try {
    if (isAdmin) {
      const userRecord = await fbAdmin.auth().createUser({ email, password });
      const uid = userRecord.uid;
      await fbAdmin.auth().setCustomUserClaims(uid, { admin: true });
      await db.collection("admin_users").doc(uid).set({ email });
    } else {
      await db.collection("whitelist").doc(email).set({ email });
    }
    return { success: true };
  } catch (err) {
    throw new functionsv2.https.HttpsError("internal", err.message);
  }
});

export const bulkCreateStudentAccounts = functionsv2.https.onCall(async (req) => {
  if (!req.auth) {
    throw new functionsv2.https.HttpsError("unauthenticated", "You must be logged in.");
  }

  const { admin } = req.auth.token;
  if (!admin) {
    throw new functionsv2.https.HttpsError("permission-denied", "Only admins can create student accounts.");
  }

  const { students } = req.data;
  if (!Array.isArray(students) || students.length === 0) {
    throw new functionsv2.https.HttpsError("invalid-argument", "students must be a non-empty array.");
  }

  const results = [];

  for (const email of students) {
    try {
      const docRef = db.collection("whitelist").doc(email);
      const doc = await docRef.get();

      if (doc.exists) {
        results.push({ email, success: false, error: "Email already exists in whitelist." });
        continue;
      }

      await docRef.set({ email });
      results.push({ email, success: true });
    } catch (err) {
      results.push({ email, success: false, error: err.message });
    }
  }

  return { results };
});

export const deleteStudentAccount = functionsv2.https.onCall(async (req) => {
  const callerUid = req.auth?.uid;
  if (!callerUid) throw new functionsv2.https.HttpsError('unauthenticated');
  
  const caller = await fbAdmin.auth().getUser(callerUid);
  if (!caller.customClaims?.admin) {
    throw new functionsv2.https.HttpsError('permission-denied', 'Not an admin');
  }

  const user = await fbAdmin.auth().getUser(req.data.uid);

  const collections = ["student_users", "student_choice"];

  await Promise.all(
    collections.map(col => db.collection(col).doc(req.data.uid).delete())
  );
  await db.collection("whitelist").doc(user.email).delete();

  await fbAdmin.auth().deleteUser(req.data.uid);
});

export const deleteStudentsBulk = functionsv2.https.onCall(async (req) => {
  const callerUid = req.auth?.uid;
  if (!callerUid) throw new functionsv2.https.HttpsError('unauthenticated');
  
  const caller = await fbAdmin.auth().getUser(callerUid);
  if (!caller.customClaims?.admin) {
    throw new functionsv2.https.HttpsError('permission-denied', 'Not an admin');
  }

  const { uids } = req.data;
  if (!Array.isArray(uids) || uids.length === 0) {
    throw new functionsv2.https.HttpsError('invalid-argument', 'uids must be a non-empty array');
  }

  const collections = ["student_users", "student_choice"];
  const results = [];

  for (const uid of uids) {
    try {
      const user = await fbAdmin.auth().getUser(uid);

      // Delete documents from collections
      await Promise.all(
        collections.map(col => db.collection(col).doc(uid).delete())
      );

      // Delete from whitelist
      await db.collection("whitelist").doc(user.email).delete();

      // Delete the user
      await fbAdmin.auth().deleteUser(uid);

      results.push({ uid, success: true });
    } catch (err) {
      results.push({ uid, success: false, error: err.message });
    }
  }

  return { results };
});

export const deleteTeacherAccount = functionsv2.https.onCall(async (req) => {
  const callerUid = req.auth?.uid;
  if (!callerUid) throw new functionsv2.https.HttpsError('unauthenticated');
  
  const caller = await fbAdmin.auth().getUser(callerUid);
  if (!caller.customClaims?.admin) {
    throw new functionsv2.https.HttpsError('permission-denied', 'Not an admin');
  }

  await fbAdmin.auth().deleteUser(req.data.uid);
});
