import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase/firebase.js';

export default function FinishLoginPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // 'loading', 'need-email', 'success'
  const [email, setEmail] = useState(localStorage.getItem('emailForSignIn') || '');
  const [errorMsg, setErrorMsg] = useState('');

  // Centralized sign-in logic
  const handleSignIn = (providedEmail) => {
    setStatus('loading');
    signInWithEmailLink(auth, providedEmail, window.location.href)
      .then(() => {
        localStorage.removeItem('emailForSignIn');
        setStatus('success');
        setTimeout(() => navigate('/login', { replace: true }), 800);
      })
      .catch((err) => {
        console.error(err);
        window.alert(err.message);
        window.location.reload();
      });
  };

  useEffect(() => {
    const url = window.location.href;
    if (!isSignInWithEmailLink(auth, url)) {
      window.alert('This sign-in link is invalid or has expired.');
      navigate('/login', { replace: true });
      return;
    }

    if (email) handleSignIn(email);
    else setStatus('need-email');
  }, [navigate]); // once on mount

  const onSubmitEmail = () => {
    if (!email) {
      setErrorMsg('Please enter your email.');
      return;
    }
    localStorage.setItem('emailForSignIn', email);
    handleSignIn(email);
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 10 }}>
      {status === 'loading' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress size={48} />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Signing you in...
          </Typography>
        </Box>
      )}

      {status === 'need-email' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1">
            Please confirm your email to complete sign-in:
          </Typography>
          <TextField
            label="Email address"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMsg('');
            }}
            error={!!errorMsg}
            helperText={errorMsg}
          />
          <Button variant="contained" onClick={onSubmitEmail}>
            Continue
          </Button>
        </Box>
      )}

      {status === 'success' && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Welcome back!
          </Typography>
          <Typography variant="body2">
            Redirecting you shortly…
          </Typography>
        </Box>
      )}
    </Container>
  );
}
