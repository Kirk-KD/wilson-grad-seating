import { Box } from "@mui/system";
import Card from "../components/login/Card";

export default function LoginPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-white-950"
    >
      <Card></Card>
    </Box>
  );
}
