import { TextField } from "@mui/material";
import StyledLoginFormBox from "../../styled/StyledLoginFormBox";

export default function TeacherForm() {
  return (
    <StyledLoginFormBox
    component="form"
    noValidate
    autoComplete="off"
    >
      <TextField id="email" label="Username" variant="outlined" type="email"></TextField>
      <TextField id="password" label="Password" variant="outlined" type="password"></TextField>
    </StyledLoginFormBox>
  );
}
