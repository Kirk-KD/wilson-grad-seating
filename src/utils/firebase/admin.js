import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase';

const functions = getFunctions(app);
const createStudentAcc = httpsCallable(functions, 'createStudentAccount');

/**
 * DB functions to be executed by admin accounts.
 */

export const createStudentAccount = async (email, oen, fname, lname) => {
  const result = await createStudentAcc({
    email: email,
    password: oen,
    fname: fname,
    lname: lname,
    admin: false
  });
  console.log("Student account created:", result.data.uid);
}

export const createAdminAccount = async (email, password) => {
  const result = await createStudentAcc({
    email: email,
    password: password,
    fname: "",
    lname: "",
    admin: true
  });
  console.log("Admin account created:", result.data.uid);
}
