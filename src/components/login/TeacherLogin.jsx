import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase/firebase.js";
import LoginForm from "./LoginForm";

export default function TeacherLogin() {
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState(null);

  const handleLogin = async ({ email, credential: password }) => {
    setErrorCode(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdTokenResult();

      if (token.claims.admin) {
        navigate("/admin");
      } else {
        await signOut(auth);
        setErrorCode("is-student");
      }
    } catch (err) {
      setErrorCode(err.code);
    }
  };

  return (
    <LoginForm
      title="Teacher Dashboard"
      passwordFieldLabel="Password"
      onSubmit={handleLogin}
      errorCode={errorCode}
    />
  );
}