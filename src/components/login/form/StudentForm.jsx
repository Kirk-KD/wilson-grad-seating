import { TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import StyledLoginFormBox from "../../styled/StyledLoginFormBox";

export default function StudentForm() {
  const theme = useTheme();
  return (
    <StyledLoginFormBox
    component="form"
    noValidate
    autoComplete="off"
    >
      <TextField id="email" label="DDSB email" variant="outlined" type="email"></TextField>
      <TextField id="password" label="OEN" variant="outlined" type="password"></TextField>
    </StyledLoginFormBox>
  );
}
