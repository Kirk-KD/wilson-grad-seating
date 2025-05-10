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
