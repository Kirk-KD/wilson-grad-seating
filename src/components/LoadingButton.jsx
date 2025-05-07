import { Button, CircularProgress } from '@mui/material';

export default function LoadingButton({ busy, children, ...props }) {
  return (
    <Button disabled={busy} {...props}>
      {busy ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
}
