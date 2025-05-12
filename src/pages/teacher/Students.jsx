import { Box, Container } from "@mui/material";
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
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/images/banner.jpg)',
                filter: 'blur(10px)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.6,
                zIndex: -10
              }}
            ></Box>
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