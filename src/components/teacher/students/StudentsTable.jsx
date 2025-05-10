import { Paper, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useStudentsContext } from "../../context/StudentsContext";
import { useStudentsManagement } from "../../context/StudentsManagementContext";
import StudentDataToolbar from "./StudentDataToolbar";

export default function StudentsTable() {
  const students = useStudentsContext();
  const { setSelectedStudents, whitelist } = useStudentsManagement();

  if (Boolean(students) || Boolean(whitelist)) {
    const emails = new Set([
      ...Object.values(students).map(s => s.email),
      ...Object.keys(whitelist)
    ]);
    const rows = Array.from(emails).map(email => {
      const student = Object.values(students).find(s => s.email === email);
      return {
        email,
        fname: student?.fname || null,
        lname: student?.lname || null,
        seatNumber: student?.seatNumber || null,
        tableId: student?.tableId || null
      };
    });

    const columns = [
      { field: "fname", headerName: "First name", width: 160 },
      { field: "lname", headerName: "Last name", width: 160 },
      { field: "tableId", headerName: "Table #", width: 90, type: "number" },
      { field: "seatNumber", headerName: "Seat #", width: 90, type: "number" },
      { field: "email", headerName: "Email", width: 300 }
    ];

    return (
      <Paper sx={{
        marginTop: 4
      }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.email}
          initialState={{ pagination: { page: 0, pageSize: 10 } }}
          pageSizeOptions={[10, 25, 50, 100]}
          slots={{ toolbar: StudentDataToolbar }}
          showToolbar
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectedStudents(Array.from(newSelection.ids).map(id => rows.find(row => row.email === id)));
          }}
          sx={{ border: 0 }}
        />
      </Paper>
    );
  }
  else return <Skeleton variant="rounded" width={"100%"} height={"100%"} />
}