import { Box } from "@mui/material";
import { SeatingSelectorProvider } from "../../components/context/SeatingSelectorContext";
import { SettingsProvider } from "../../components/context/SettingsContext";
import { StudentsProvider } from "../../components/context/StudentsContext";
import { StudentSeatBookingProvider } from "../../components/context/StudentSeatBookingContext";
import { TablesProvider } from "../../components/context/TablesContext";
import StudentAppBar from "../../components/student/StudentAppBar";
import StudentDashboard from "../../components/student/StudentDashboard";
import UserOnly from "../UserOnly";

export default function StudentPage() {
  return (
    <UserOnly admin={false}>
      <SettingsProvider>
        <SeatingSelectorProvider>
          <StudentSeatBookingProvider>
            <TablesProvider>
              <StudentsProvider>
                <Box
                  sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    // backgroundImage: 'url(/images/login-background.svg)',
                    backgroundImage: 'url(/images/banner.jpg)',
                    backgroundColor: (theme) => theme.palette.landingbg.main,
                    filter: 'blur(10px)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.6,
                    zIndex: -10
                  }}
                ></Box>
                <StudentAppBar />
                <StudentDashboard />
              </StudentsProvider>
            </TablesProvider>
          </StudentSeatBookingProvider>
        </SeatingSelectorProvider>
      </SettingsProvider>
    </UserOnly>
  );
}
