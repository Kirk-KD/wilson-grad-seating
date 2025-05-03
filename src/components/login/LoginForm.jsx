// src/components/LoginForm.jsx
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import StyledFormBox from "./StyledFormBox";
import WilsonLogo from "./WilsonLogo";

export default function LoginForm({
  title,
  passwordFieldLabel,
  onSubmit,
}) {
  const [email, setEmail] = useState("");
  const [credential, setCredential] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, credential });
  };

  return (
    <StyledFormBox component="form" onSubmit={handleSubmit}>
      <WilsonLogo />

      <Typography variant="h5" align="center">
        {title}
      </Typography>

      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label={passwordFieldLabel}
          type={"password"}
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </Stack>
    </StyledFormBox>
  );
}
