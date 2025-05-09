import '@fontsource-variable/raleway';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Box, Typography, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

const mobile = 'md';

const StyledNavButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Raleway Variable', sans-serif",
  fontWeight: 800,
  '&:hover': {
    transform: 'scale(1.1)',
    transition: 'transform 0.1s ease-in-out',
  },
}));

const StyledTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  flexGrow: 1,
  width: '100%',
}));

const StyledTitle = styled((props) => <Typography variant="h1" {...props} />, {
  shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'align',
})(({ theme, sx, align }) => ({
  fontFamily: "'Raleway Variable', sans-serif",
  fontWeight: 900,
  fontSize: '10rem',
  lineHeight: 1,
  height: "fit-content",
  color: theme.palette.common.white,
  textAlign: align,
  fontSize: 'clamp(2rem, 18vw, 15rem)',
  [theme.breakpoints.down('sm')]: {
    lineHeight: 1.2
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '30vw'
  },
  ...sx,
}));

const StyledHeroBox = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/images/banner.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  gap: {
    xs: 0.5,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledTitleBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ theme, isMobile }) => ({
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  height: 'fit-content',
  alignItems: isMobile ? 'center' : 'flex-start',
  '& > *:not(:last-child)': {
    marginRight: isMobile ? 0 : '-5rem',
    marginBottom: isMobile ? '-2rem' : 0,
  },
}));

const StyledScrollButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  fontFamily: "'Raleway Variable', sans-serif",
  fontWeight: 800,
  color: theme.palette.common.white,
  borderColor: theme.palette.common.white,
}));

export default function LandingPage() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down(mobile));

  return (
    <StyledHeroBox>
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

          <StyledNavButton color="inherit" variant="text">LOG IN</StyledNavButton>
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
      >
        <StyledScrollButton variant="outlined">
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
}