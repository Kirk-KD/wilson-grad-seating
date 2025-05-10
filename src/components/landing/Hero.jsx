import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { AppBar, Box, Typography, useMediaQuery } from '@mui/material';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StyledHeroBox,
  StyledNavButton,
  StyledScrollButton,
  StyledTitle,
  StyledTitleBox,
  StyledTitleContainer,
  StyledToolbar,
} from './HeroStyled';

const Hero = forwardRef((props, ref) => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <StyledHeroBox ref={ref} {...props}>
      <AppBar position="static" style={{ 
        background: 'transparent', 
        boxShadow: 'none'
      }}>
        <StyledToolbar>
          <Typography variant="h5" color="inherit" sx={{
            display: {
              xs: 'none',
              sm: 'block',
            },
            fontFamily: "'Raleway Variable', sans-serif",
            fontWeight: 800,
          }}>
            DAW 2025
          </Typography>

          <Box sx={{
            flexGrow: {
              xs: 0,
              sm: 1,
            }
          }} />

          <StyledNavButton color="inherit" variant="text" onClick={() => {
            navigate("/login");
          }}>LOG IN</StyledNavButton>
          <StyledNavButton color="inherit" variant="text">FAQ</StyledNavButton>
          <StyledNavButton color="inherit" variant="text">CONTACT</StyledNavButton>
        </StyledToolbar>
      </AppBar>

      <StyledTitleContainer>
        <StyledTitleBox isMobile={isMobile}>
          <StyledTitle>
            Grad
            {!isMobile && <br />}
          </StyledTitle>
          <StyledTitle>
            {!isMobile && <br />}
            Social
          </StyledTitle>
        </StyledTitleBox>
      </StyledTitleContainer>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        paddingTop={5}
        zIndex={1}
      >
        <StyledScrollButton variant="outlined" >
          CHOOSE YOUR SEAT
        </StyledScrollButton>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 2,
        }}>
          <Box sx={{
            animation: 'bop 1.5s infinite',
            color: 'white',
          }}>
            <KeyboardDoubleArrowDownIcon />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '10rem',
          background: (theme) =>
            `linear-gradient(to bottom, transparent, ${theme.palette.landingbg.main})`,
          pointerEvents: 'none',
        }}
      />

      <style>
        {`
          @keyframes bop {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </StyledHeroBox>
  );
});

export default Hero;
