import { SeatingSelectorProvider } from "../../components/context/SeatingSelectorContext";
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
            <AssignStudentDialog />
            <EditorTableDialog />
            <SeatingEditor />
          </StudentsProvider>
        </TablesProvider>
      </SeatingSelectorProvider>
    </TeacherSeatingEditorProvider>
  );
}
