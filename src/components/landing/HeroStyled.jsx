import { Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledNavButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Raleway Variable', sans-serif",
  fontWeight: 800,
  '&:hover': {
    transform: 'scale(1.1)',
    transition: 'transform 0.1s ease-in-out',
  },
}));

export const StyledTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  width: '100%',
}));

export const StyledTitle = styled((props) => <Typography variant="h1" {...props} />, {
  shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'align',
})(({ theme, sx, align }) => ({
  fontFamily: "'Raleway Variable', sans-serif",
  fontWeight: 900,
  lineHeight: 1.2,
  height: 'fit-content',
  color: theme.palette.common.white,
  textAlign: align,
  fontSize: '28vw',

  [theme.breakpoints.up('sm')]: {
    fontSize: '30vw'
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '8rem'
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '10rem',
    lineHeight: 1
  },

  ...sx,
}));

export const StyledHeroBox = styled(Stack)(({ theme }) => ({
  backgroundImage: 'url("/images/banner.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  width: "100%",
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
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

export const StyledTitleBox = styled(Box, {
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

export const StyledScrollButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '20px',
  fontFamily: "'Raleway Variable', sans-serif",
  fontWeight: 800,
  fontSize: '1.8em',
  color: theme.palette.primary.main,
  borderColor: theme.palette.common.white,
  transition: 'transform 0.15s ease-in-out',
  transformOrigin: 'center center',
  '&:hover': {
    transform: 'scale(1.2)',
  },
}));
