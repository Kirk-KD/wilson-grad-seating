import AccountCircle from '@mui/icons-material/AccountCircle';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase/firebase';

export default function AccountButton({ onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);

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

  const navigate = useNavigate();

  return <>
    <IconButton
      size="large"
      onClick={handleOpenProfileMenu}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
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
      <MenuItem onClick={() => {
        handleCloseProfileMenu();
        if (user) auth.signOut();
        navigate("/");
      }}>Logout</MenuItem>
    </Menu>
  </>
}