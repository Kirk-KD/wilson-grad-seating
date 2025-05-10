import { Autocomplete, TextField } from "@mui/material";
import { useStudentsContext } from "../context/StudentsContext";

export default function StudentsAutocomplete({ filter, onChange, sx }) {
  const students = useStudentsContext();
  const options = Object.values(students).filter(filter);

  return <Autocomplete
    sx={sx}
    options={options}
    getOptionKey={(student) => student.email}
    getOptionLabel={(student) => {
      const namePart = [student.fname, student.lname].filter(Boolean).join(" ");
      return namePart ? `${namePart}, ${student.email}` : student.email;
    }}
    onChange={onChange}
    isOptionEqualToValue={(option, value) => option.email === value.email}
    renderInput={(params) => <TextField {...params} label="Select student" />}
  />
}