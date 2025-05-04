import { Box, Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import TopAppBar from "./TopAppBar";
import TopNavBar from "./TopNavBar";

export default function DashboardLayout() {
  return (
    <Box>
      <TopAppBar />
      <TopNavBar />
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
}