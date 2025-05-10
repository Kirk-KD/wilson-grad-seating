import { keyframes } from "@mui/material";
import { styled } from "@mui/system";

const popIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const AnimatedContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== "delay",
})(({ delay }) => ({
  transformOrigin: "center center",
  opacity: 0,
  transform: "scale(0)",
  animation: `${popIn} 0.4s ease-out forwards`,
  animationDelay: `${delay}ms`,
}));

export default AnimatedContainer;