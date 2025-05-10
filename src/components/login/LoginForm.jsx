import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { fetchSignInMethodsForEmail, sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../utils/firebase/firebase.js";
import LoginErrorAlert from "./LoginErrorAlert";
import StyledFormBox from "./StyledFormBox";
import WilsonLogo from "./WilsonLogo";

const actionCodeSettings = {
  url: window.location.origin + "/finishLogin",
  handleCodeInApp: true
};

export default function LoginForm({
  title,
  passwordFieldLabel,
  onSubmit,
  errorCode
}) {
  const [email, setEmail] = useState("");
  const [credential, setCredential] = useState("");

  const [useEmailLink, setUseEmailLink] = useState(true);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (useEmailLink) {
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        if (methods.length === 0) {
          console.log(methods);
          setMsg("No account found for that email. Please contact a teacher.");
          return;
        }

        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem("emailForSignIn", email);
        setMsg("Check your inbox for the sign-in link!");
      } catch (e) {
        setMsg("Error: " + e.message);
      }
    }
    else onSubmit({ email, credential }); // OEN or password
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

        {
          useEmailLink ? 
          <>
            <Button type="submit" variant="contained" fullWidth>
              Send login link
            </Button>
            <Typography>{msg}</Typography>
          </> : 
          <>
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
          </>
        }

        <Divider><Typography color="textSecondary">or</Typography></Divider>

        {
          useEmailLink ? <>
            <Button variant="outlined" onClick={() => setUseEmailLink(false)}>Use {passwordFieldLabel}</Button>
          </> : <>
            <Button variant="outlined" onClick={() => setUseEmailLink(true)}>Use login link</Button>
            <Typography variant="subtitle1" color="textSecondary" align="center">We will send a secure link to your inbox.</Typography>
          </>
        }

        {errorCode != null && <LoginErrorAlert errorCode={errorCode} />}
      </Stack>
    </StyledFormBox>
  );
}
