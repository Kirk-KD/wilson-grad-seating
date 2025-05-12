import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { IconButton, Skeleton, Switch, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';
import { setStudentAllowBook } from "../../../utils/operations/teacher";
import { useStudentsContext } from "../../context/StudentsContext";
import { useStudentsManagement } from "../../context/StudentsManagementContext";
import StudentDataToolbar from "./StudentDataToolbar";

export default function StudentsTable() {
  const students = useStudentsContext();
  const { setSelectedUids } = useStudentsManagement();
  const navigate = useNavigate();

  const handleLocateClick = (tableId, seatNumber) => {
    navigate(`/admin?tableId=${tableId}&seatNumber=${seatNumber}`);
  };

  const handleToggleChange = async (uid, checked) => {
    await setStudentAllowBook({ uid, allowBook: checked });
  };

  if (students != null) {
    const rows = Object.entries(students).map(([uid, data]) => ({ ...data, uid }));
    const columns = [
      {
        field: "locate",
        headerName: "",
        width: 50,
        renderCell: (params) => (
          params.row.tableId != null && params.row.seatNumber != null ? (
            <Tooltip title="Locate student">
              <IconButton onClick={() => handleLocateClick(params.row.tableId, params.row.seatNumber)}>
                <PersonSearchIcon />
              </IconButton>
            </Tooltip>
          ) : null
        ),
        disableColumnMenu: true,
        sortable: false
      },
      { field: "fname", headerName: "First name", width: 140 },
      { field: "lname", headerName: "Last name", width: 140 },
      { field: "tableId", headerName: "Table #", width: 70, type: "number" },
      { field: "seatNumber", headerName: "Seat #", width: 70, type: "number" },
      { field: "email", headerName: "Email", width: 200 },
      { field: "oen", headerName: "OEN", width: 200 },
      {
        field: "allowBook",
        headerName: "Allow Booking",
        width: 140,
        renderCell: (params) => (
          <Switch
            checked={params.row.allowBook}
            onChange={(event) => handleToggleChange(params.row.uid, event.target.checked)}
          />
        ),
      },
    ];

    return (
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.uid}
        initialState={{ pagination: { page: 0, pageSize: 10 } }}
        pageSizeOptions={[10, 25, 50, 100]}
        slots={{ toolbar: StudentDataToolbar }}
        showToolbar
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newSelection) => {
          setSelectedUids(Array.from(newSelection.ids));
        }}
        sx={{
          my: 4,
          border: 0,
          backgroundColor: (theme) => theme.palette.background.paper
        }}
      />
    );
  } else {
    return <Skeleton variant="rounded" width={"100%"} height={"100%"} />;
  }
}