/**

READ BY ANYONE; WRITE BY ADMIN
student_info (collection):
  <uid> (document):
    fname
    lname

READ/WRITE BY ADMIN
student_users (collection):
  <uid> (document):
    email
    oen

READ/CREATE BY ADMIN; DELETE BY SELF; NO UPDATES
admin_users (collection):
  <uid> (document):
    email

READ BY ANYONE; UPDATE BY SELF OR ADMIN; DELETION BY ADMIN
student_choice (collection):
  <uid> (document):
    tableId = null
    seatNumber = null

READ BY ANYONE; WRITE BY MATCHED UID OR UID == NULL OR ADMIN
tables (collection):
  <tableId> (document):
    seats (collection):
      <seatNumber> (document):
        uid = null

*/

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import {
  getAuth
} from 'firebase/auth';
import {
  getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);