import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isInWhitelist } from '../../utils/firebase/users.js';
import LoginForm from "./LoginForm";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState(null);
  const auth = getAuth();

  const handleLogin = async (credentialResponse) => {
    setErrorCode(null);
    try {
      const firebaseCredential = GoogleAuthProvider.credential(credentialResponse.credential);

      const userCredential = await signInWithCredential(auth, firebaseCredential);
      const user = userCredential.user;
      
      if (await isInWhitelist({ email: user.email })) {
        navigate("/student");
      } else {
        setErrorCode("not-whitelisted");
      }
    } catch (err) {
      console.error("Login error", err);
      setErrorCode(err.code);
    }
  };

  return (
    <LoginForm
      title="Wilson Grad Social"
      onSubmit={() => {}}
      errorCode={errorCode}
      onGoogleSignIn={handleLogin}
    />
  );
}