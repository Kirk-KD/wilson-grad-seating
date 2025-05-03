import admin from "firebase-admin";
import functions from "firebase-functions";

admin.initializeApp();

const db = admin.firestore();

export const createStudentAccount = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be logged in.");
  }

  const { admin } = context.auth.token;
  if (!admin) {
    throw new functions.https.HttpsError("permission-denied", "Only admins can create student accounts.");
  }

  const { email, password, fname, lname, isAdmin } = data;

  try {
    const userRecord = await admin.auth().createUser({ email, password });
    const uid = userRecord.uid;

    if (isAdmin) {
      await admin.auth().setCustomUserClaims(uid, { admin: true });
      await db.collection("admin_users").doc(uid).set({ email });
    } else {
      await db.collection("student_info").doc(uid).set({ fname, lname });
      await db.collection("student_users").doc(uid).set({ email });
    }

    return { success: true, uid };
  } catch (err) {
    throw new functions.https.HttpsError("internal", err.message);
  }
});