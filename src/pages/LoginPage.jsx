import { Box } from "@mui/system";
import LoginCard from "../components/login/LoginCard";

export default function LoginPage() {
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
