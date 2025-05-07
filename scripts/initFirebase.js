import dotenv from 'dotenv';
import admin from 'firebase-admin';

import serviceAccount from './service-acc-key.json' assert { type: 'json' };

dotenv.config({ path: ".env.local" });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

async function seedTables() {
  const batch = db.batch();

  for (let i = 1; i <= 54; i++) {
    const tableRef = db.collection('tables').doc(i.toString());
    const seats = {};
    for (let seat = 1; seat <= 10; seat++) {
      seats[seat.toString()] = null;
    }
    batch.set(tableRef, { seats });
  }

  await batch.commit();
  console.log('Seeded embedded tables 1-54 with seats.');
}

async function createAdmin() {
  admin.auth().createUser({
    email: process.env.REACT_APP_DEFAULT_ADMIN_EMAIL,
    password: process.env.REACT_APP_DEFAULT_ADMIN_PASSWORD
  })
  .then(userRecord => {
    const batch = db.batch();
    const adminUserRef = db.collection("admin_users").doc(userRecord.uid);
    batch.set(adminUserRef, { email: process.env.REACT_APP_DEFAULT_ADMIN_EMAIL });
    batch.commit();

    admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });

    console.log("Created admin account: ", process.env.REACT_APP_DEFAULT_ADMIN_EMAIL);
  });
}

seedTables();
// createAdmin();
