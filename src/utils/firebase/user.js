/**
 * Generic DB functions involving any user.
 */

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  await auth.signOut();
};