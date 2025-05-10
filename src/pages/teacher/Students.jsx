import { Container } from "@mui/material";
import { SeatingSelectorProvider } from "../../components/context/SeatingSelectorContext";
import { StudentsProvider } from "../../components/context/StudentsContext";
import { StudentsManagementProvider } from "../../components/context/StudentsManagementContext";
import CsvUploadDialog from "../../components/teacher/students/CsvUploadDialog";
import DeleteStudentsDialog from "../../components/teacher/students/DeleteStudentsDialog";
import NewStudentDialog from "../../components/teacher/students/NewStudentDialog";
import StudentsTable from "../../components/teacher/students/StudentsTable";

export default function Students() {
  return (
    <SeatingSelectorProvider>
      <StudentsManagementProvider>
        <StudentsProvider>
          <Container>
            <CsvUploadDialog />
            <DeleteStudentsDialog />
            <NewStudentDialog />
            <StudentsTable />
          </Container>
        </StudentsProvider>
      </StudentsManagementProvider>
    </SeatingSelectorProvider>
  );
}