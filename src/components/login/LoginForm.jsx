import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import LoginErrorAlert from "./LoginErrorAlert";
import StyledFormBox from "./StyledFormBox";
import WilsonLogo from "./WilsonLogo";

export default function LoginForm({
  onGoogleSignIn,
  title,
  passwordFieldLabel,
  onSubmit,
  errorCode
}) {
  const [email, setEmail] = useState("");
  const [credential, setCredential] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Boolean(onGoogleSignIn)) {
      onGoogleSignIn();
      return;
    }
    onSubmit({ email, credential });
  };

  return (
    <StyledFormBox component="form" onSubmit={handleSubmit}>
      <WilsonLogo />

      <Typography variant="h5" align="center">
        {title}
      </Typography>

      <Stack spacing={2} sx={{ mt: 2, display: "flex", flexGrow: 1 }}>
        {
          !Boolean(onGoogleSignIn) ?
          <>
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
          </> :
          <>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", flexGrow: 0.5 }}>
              <GoogleLogin
                width="300px"
                shape="rectangular"
                onError={() => {
                  alert("Login failed. Please try again later.");
                }}
                onSuccess={onGoogleSignIn}
              />
            </Box>
          </>
        }

        {errorCode != null && <LoginErrorAlert errorCode={errorCode} />}
      </Stack>
    </StyledFormBox>
  );
}
