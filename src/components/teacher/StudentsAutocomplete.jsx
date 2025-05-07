import { Autocomplete, TextField } from "@mui/material";
import { useStudentsContext } from "../context/StudentsContext";

export default function StudentsAutocomplete({ filter, onChange, sx }) {
  const students = useStudentsContext();
  const options = Object.entries(students).map(([uid, student]) => ({...student, uid})).filter(filter);

  return <Autocomplete
    sx={sx}
    options={options}
    getOptionKey={(student) => student.oen}
    getOptionLabel={(student) => `${student.fname} ${student.lname}, ${student.oen}`}
    onChange={onChange}
    isOptionEqualToValue={(option, value) => option.uid === value.uid}
    renderInput={(params) => <TextField {...params} label="Select student" />}
  />
}