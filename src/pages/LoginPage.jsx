import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import LoginCard from "../components/login/LoginCard";

export default function LoginPage() {
  const { user, loading: authLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;

    if (!user) return;
    
    user.getIdTokenResult()
      .then(tokenResult => {
        const claims = tokenResult.claims;
        if (Boolean(claims?.admin)) navigate("/admin");
        else navigate("/student");
      })
      .catch(err => {
        console.error('Failed to fetch token claims', err);
      });
  }, [user]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/images/login-background.svg)",
        backgroundColor: (theme) => theme.palette.landingbg.main,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      <LoginCard/>
    </Box>
  );
}
