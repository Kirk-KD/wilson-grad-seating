import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { fetchSignInMethodsForEmail, sendSignInLinkToEmail } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../utils/firebase/firebase.js";
import LoadingButton from "../LoadingButton.jsx";
import LoginErrorAlert from "./LoginErrorAlert";
import StyledFormBox from "./StyledFormBox";
import WilsonLogo from "./WilsonLogo";

const actionCodeSettings = {
  url: window.location.origin + "/finishLogin",
  handleCodeInApp: true,
};

export default function LoginForm({
  title,
  passwordFieldLabel,
  onSubmit,
  errorCode,
}) {
  const [email, setEmail] = useState("");
  const [credential, setCredential] = useState("");
  const [useEmailLink, setUseEmailLink] = useState(true);
  const [msg, setMsg] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);

  // start cooldown timer
  const startCooldown = (seconds) => {
    setCooldown(seconds);
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (useEmailLink) {
      if (cooldown > 0) return;
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        if (methods.length === 0) {
          setMsg("No account found for that email. Please contact a teacher.");
          return;
        }

        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem("emailForSignIn", email);
        setMsg("Check your inbox for the sign-in link!");
        startCooldown(60); // 60-second cooldown
      } catch (e) {
        setMsg("Error: " + e.message);
      }
    } else {
      setBusy(true);
      await onSubmit({ email, credential }); // OEN or password
      setBusy(false);
    }
  };

  const [busy, setBusy] = useState(false);

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

        {useEmailLink ? (
          <>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={cooldown > 0}
            >
              {cooldown > 0 ? `Send again in ${cooldown}` : "Send login link"}
            </Button>
            <Typography variant="body2" color="textSecondary">
              {msg}
            </Typography>
          </>
        ) : (
          <>
            <TextField
              label={passwordFieldLabel}
              type="password"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              fullWidth
            />
            <LoadingButton busy={busy} type="submit" variant="contained" fullWidth>
              Login
            </LoadingButton>
          </>
        )}

        <Divider>
          <Typography color="textSecondary">or</Typography>
        </Divider>

        {useEmailLink ? (
          <Button variant="outlined" onClick={() => setUseEmailLink(false)}>
            Use {passwordFieldLabel}
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={() => setUseEmailLink(true)}>
              Use login link
            </Button>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
            >
              We will send a secure link to your inbox.
            </Typography>
          </>
        )}

        {errorCode != null && <LoginErrorAlert errorCode={errorCode} />}
      </Stack>
    </StyledFormBox>
  );
}
