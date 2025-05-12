import { Box } from "@mui/material";
import { SeatingSelectorProvider } from "../../components/context/SeatingSelectorContext";
import { SettingsProvider } from "../../components/context/SettingsContext";
import { StudentsProvider } from "../../components/context/StudentsContext";
import { TablesProvider } from "../../components/context/TablesContext";
import { TeacherSeatingEditorProvider } from "../../components/context/TeacherSeatingEditorContext";
import AssignStudentDialog from "../../components/teacher/seating/AssignStudentDialog";
import EditorTableDialog from "../../components/teacher/seating/EditorTableDialog";
import SeatingEditor from "../../components/teacher/seating/SeatingEditor";

export default function Seating() {
  return (
    <TeacherSeatingEditorProvider>
      <SeatingSelectorProvider>
        <TablesProvider>
          <StudentsProvider>
            <SettingsProvider>
              <Box
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
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
              <AssignStudentDialog />
              <EditorTableDialog />
              <SeatingEditor />
            </SettingsProvider>
          </StudentsProvider>
        </TablesProvider>
      </SeatingSelectorProvider>
    </TeacherSeatingEditorProvider>
  );
}
