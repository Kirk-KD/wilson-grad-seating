import { Box } from "@mui/system";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from "../components/login/LoginCard";
import { useAdminStatus } from "../hooks/useAdminStatus";
import { auth } from "../utils/firebase/firebase";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAdmin, checked } = useAdminStatus();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isAdmin != null && user && checked) navigate(isAdmin ? "/admin" : "/student");
    });

    return () => unsubscribe();
  }, [isAdmin, checked, navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/images/login-background.svg)",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      <LoginCard/>
    </Box>
  );
}
