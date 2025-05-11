import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Box, useTheme } from '@mui/system';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase/firebase';
import { useStudentSeatBooking } from './context/StudentSeatBookingContext';

export default function AccountButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setOpenBookingCardDialog } = useStudentSeatBooking();

  const handleOpenProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const theme = useTheme();

  const navigate = useNavigate();

  return <>
    <IconButton
      size="large"
      onClick={handleOpenProfileMenu}
      sx={{
        color: (theme) => theme.palette.primary.dark,
      }}
    >
      <AccountCircle sx={{
        fontSize: "2rem"
      }} />
    </IconButton>
    <Button sx={{
      backgroundColor: (theme) => theme.palette.primary.dark,
      color: '#fff'
    }} onClick={() => setOpenBookingCardDialog(true)}>
      My card
    </Button>
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleCloseProfileMenu}
    >
      <Box sx={{
        marginX: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        paddingY: 1
      }}>
        {Boolean(user) && user.email}
      </Box>
      <MenuItem onClick={() => {
        handleCloseProfileMenu();
        if (user) auth.signOut();
        navigate("/");
      }}>Logout</MenuItem>
    </Menu>
  </>
}