import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Papa from "papaparse";
import { useState } from "react";
import { bulkRegisterStudents } from "../../../utils/operations/teacher.js";
import { useStudentsManagement } from "../../context/StudentsManagementContext";
import LoadingButton from "../../LoadingButton";

export default function CsvUploadDialog() {
  const {
    csvUploadDialogOpen,
    setCsvUploadDialogOpen,
    csvStudents,
    setCsvStudents,
  } = useStudentsManagement();
  
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const [registering, setRegistering] = useState(false);
  const [failedStudents, setFailedStudents] = useState([]);

  const requiredHeaders = ["email", "first_name", "last_name", "oen"];

  const reset = () => {
    setFailedStudents([]);
    setProgress(0);
    setCsvStudents([]);
    setError(null);
  };

  const handleClose = () => {
    if (processing) return;
    reset();
    setCsvUploadDialogOpen(false);
    setProcessing(false);
  };

  const handleFile = (file) => {
    reset();
    setProcessing(true);

    const results = [];
    let count = 0;
    let headersValidated = false;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      step: ({ data, meta }) => {
        if (!headersValidated) {
          const headers = meta.fields;
          const isValid = requiredHeaders.every((header) => headers.includes(header));
          if (!isValid || headers.length !== requiredHeaders.length) {
            setError("CSV must have exactly the headers: email, first_name, last_name, oen.");
            setProcessing(false);
            return;
          }
          headersValidated = true;
        }
        const transformedData = {
          fname: data.first_name,
          lname: data.last_name,
          email: data.email,
          oen: data.oen,
        };
        results.push(transformedData);
        count += 1;
        setProgress(Math.round((count / 1000) * 100));
      },
      complete: () => {
        if (headersValidated) {
          setCsvStudents(results);
          setProcessing(false);
          setProgress(100);
        }
      },
      error: (err) => {
        setError(err.message);
        setProcessing(false);
      },
    });
  };

  const handleRegisterAll = async () => {
    setRegistering(true);
    try {
      const results = (await bulkRegisterStudents({ students: csvStudents })).results;
      setFailedStudents(results.filter((result) => !result.success));
    } catch (err) {
      alert(err.message);
    } finally {
      setCsvStudents([]);
      setRegistering(false);
    }
  };

  return (
    <Dialog open={csvUploadDialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload CSV</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" color="textSecondary">
          Headers must be exactly first_name, last_name, email, and oen.
        </Typography>

        {/* Show parsed students or file input */}
        { Boolean(csvStudents.length) ? (
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid
              rows={csvStudents.map((student, index) => ({ id: index, ...student }))}
              columns={[
                { field: 'fname', headerName: 'First Name', flex: 1 },
                { field: 'lname', headerName: 'Last Name', flex: 1 },
                { field: 'email', headerName: 'Email', flex: 1 },
                { field: 'oen', headerName: 'OEN', flex: 1 },
              ]}
              density="compact"
            />
          </div>
        ) : (
          processing ? (
            <>
              <LinearProgress variant="determinate" value={progress} />
              { error && <Alert severity="error">{error}</Alert> }
            </>
          ) : (
            <>
              <input
                style={{ marginTop: 16 }}
                type="file"
                accept=".csv"
                onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
              />
              { error && <Alert severity="error">{error}</Alert> }
            </>
          )
        ) }

        {/* Show failures if any */}
        { failedStudents.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <Typography variant="subtitle2" color="error">
              Failed to register the following students:
            </Typography>
            <div style={{ height: 200, width: '100%' }}>
              <DataGrid
                rows={failedStudents.map((stu, idx) => ({ id: idx, email: stu.email, error: stu.error }))}
                columns={[
                  { field: 'email', headerName: 'Email', flex: 2 },
                  { field: 'error', headerName: 'Reason', flex: 3 },
                ]}
                density="compact"
                hideFooter
              />
            </div>
          </div>
        ) }

      </DialogContent>
      <DialogActions>
        <Typography variant="subtitle1" color="textSecondary" style={{ marginRight: 'auto' }}>
          Processing may take longer for a high number of students.
        </Typography>
        <LoadingButton
          busy={registering}
          onClick={handleRegisterAll}
          variant="contained"
          disabled={processing || registering || !Boolean(csvStudents.length)}
        >
          Add All{ csvStudents.length > 0 && ` (${csvStudents.length})` }
        </LoadingButton>
        <Button
          onClick={handleClose}
          variant="outlined"
          disabled={processing || registering}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
