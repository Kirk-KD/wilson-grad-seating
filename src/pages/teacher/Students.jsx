import { StudentsProvider } from "../../components/context/StudentsContext";
import { StudentsManagementProvider } from "../../components/context/StudentsManagementContext";
import CsvUploadDialog from "../../components/teacher/students/CsvUploadDialog";
import DeleteStudentsDialog from "../../components/teacher/students/DeleteStudentsDialog";
import NewStudentDialog from "../../components/teacher/students/NewStudentDialog";
import StudentsTable from "../../components/teacher/students/StudentsTable";

export default function Students() {
  return (
    <StudentsManagementProvider>
      <StudentsProvider>
        <CsvUploadDialog />
        <DeleteStudentsDialog />
        <NewStudentDialog />
        <StudentsTable />
      </StudentsProvider>
    </StudentsManagementProvider>
  );
}