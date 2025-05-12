import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AppBar, Box, Typography, useMediaQuery } from '@mui/material';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedContainer from '../AnimatedContainer';
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
    <StyledHeroBox ref={ref} {...props} gap={'5vh'}>
      <AppBar position="static" style={{ 
        background: 'transparent', 
        boxShadow: 'none'
      }}>
        <StyledToolbar>
          <Typography variant="h5" color="inherit" sx={{
            fontFamily: "'Raleway Variable', sans-serif",
            fontWeight: 800,
          }}>
            DAW 2025
          </Typography>

          <Box sx={{
            flexGrow: 1
          }} />

          <StyledNavButton color="inherit" variant="text" onClick={() => {
            navigate("/login");
          }}>LOG IN</StyledNavButton>
        </StyledToolbar>
      </AppBar>

      <StyledTitleContainer>
        <StyledTitleBox isMobile={isMobile}>
          <AnimatedContainer delay={50}>
            <StyledTitle>
              Grad
              {!isMobile && <br />}
            </StyledTitle>
          </AnimatedContainer>
          <AnimatedContainer delay={100}>
            <StyledTitle>
              {!isMobile && <br />}
              Social
            </StyledTitle>
          </AnimatedContainer>
        </StyledTitleBox>
      </StyledTitleContainer>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        zIndex={1}
        flexGrow={0.5}
      >
        <AnimatedContainer delay={500}>
          <StyledScrollButton variant="contained" size="large" onClick={() => navigate("/login")}>
            <Typography fontSize={'inherit'} fontWeight={'inherit'} sx={{
              display: {
                xs: 'none',
                sm: 'inline-block',
              }
            }}>BOOK YOUR SEAT</Typography>
            <ArrowForwardIcon fontSize='inherit' sx={{
              marginLeft: {
                xs: 0,
                sm: 2
              }
            }} />
          </StyledScrollButton>
        </AnimatedContainer>
      </Box>
    </StyledHeroBox>
  );
});

export default Hero;
