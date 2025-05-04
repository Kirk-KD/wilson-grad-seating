import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase/firebase.js";
import LoginForm from "./LoginForm";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState(null);

  const handleLogin = async ({ email, credential: oen }) => {
    setErrorCode(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, oen);
      const user = userCredential.user;
      const token = await user.getIdTokenResult();
      
      if (token.claims.admin) {
        await signOut(auth);
        setErrorCode("is-teacher");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setErrorCode(err.code);
    }
  };

  return (
    <LoginForm
      title="Wilson Grad Social"
      passwordFieldLabel="OEN"
      onSubmit={handleLogin}
      errorCode={errorCode}
    />
  );
}