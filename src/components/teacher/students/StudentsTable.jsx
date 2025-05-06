import { Paper, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useStudentsContext } from "../../context/StudentsContext";
import { useStudentsManagement } from "../../context/StudentsManagementContext";
import StudentDataToolbar from "./StudentDataToolbar";

export default function StudentsTable() {
  const students = useStudentsContext();
  const { setSelectedUids } = useStudentsManagement();

  if (students != null) {
    const rows = Object.entries(students).map(([uid, data]) => ({ ...data, uid }));
    const columns = [
      { field: "fname", headerName: "First name", width: 160 },
      { field: "lname", headerName: "Last name", width: 160 },
      { field: "tableId", headerName: "Table #", width: 90, type: "number" },
      { field: "seatNumber", headerName: "Seat #", width: 90, type: "number" },
      { field: "email", headerName: "Email", width: 300 },
      { field: "oen", headerName: "OEN", width: 300 },
      { field: "uid", headerName: "UID", width: 160 },
    ];

    return (
      <Paper sx={{
        marginTop: 4
      }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.uid}
          initialState={{ pagination: { page: 0, pageSize: 10 } }}
          pageSizeOptions={[10, 25, 50, 100]}
          slots={{ toolbar: StudentDataToolbar }}
          showToolbar
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectedUids(newSelection);
          }}
          sx={{ border: 0 }}
        />
      </Paper>
    );
  }
  else return <Skeleton variant="rounded" width={"100%"} height={"100%"} />
}