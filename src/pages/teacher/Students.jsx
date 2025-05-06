import { StudentsProvider } from "../../components/context/StudentsContext";
import { StudentsManagementProvider } from "../../components/context/StudentsManagementContext";
import NewStudentDialog from "../../components/teacher/students/NewStudentDialog";
import StudentsTable from "../../components/teacher/students/StudentsTable";

export default function Students() {
  return (
    <StudentsManagementProvider>
      <StudentsProvider>
        <NewStudentDialog />
        <StudentsTable />
      </StudentsProvider>
    </StudentsManagementProvider>
  );
}