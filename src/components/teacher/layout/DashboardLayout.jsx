import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import UserOnly from "../../../pages/UserOnly";
import TopAppBar from "./TopAppBar";
import TopNavBar from "./TopNavBar";

export default function DashboardLayout() {
  return (
    <UserOnly admin={true}>
      <Box>
        <TopAppBar />
        <TopNavBar />
        {/* <Container> */}
          <Outlet />
        {/* </Container> */}
      </Box>
    </UserOnly>
  );
}