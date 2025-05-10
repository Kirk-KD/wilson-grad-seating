import { SeatingSelectorProvider } from "../../components/context/SeatingSelectorContext";
import { SettingsProvider } from "../../components/context/SettingsContext";
import { StudentsProvider } from "../../components/context/StudentsContext";
import { TablesProvider } from "../../components/context/TablesContext";
import { TeacherSeatingEditorProvider } from "../../components/context/TeacherSeatingEditorContext";
import AssignStudentDialog from "../../components/teacher/seating/AssignStudentDialog";
import EditorTableDialog from "../../components/teacher/seating/EditorTableDialog";
import SeatingEditor from "../../components/teacher/seating/SeatingEditor";
import { Settings } from "../../components/teacher/seating/Settings";

export default function Seating() {
  return (
    <TeacherSeatingEditorProvider>
      <SeatingSelectorProvider>
        <TablesProvider>
          <StudentsProvider>
            <SettingsProvider>
              <AssignStudentDialog />
              <EditorTableDialog />
              <SeatingEditor />
              <Settings />
            </SettingsProvider>
          </StudentsProvider>
        </TablesProvider>
      </SeatingSelectorProvider>
    </TeacherSeatingEditorProvider>
  );
}
