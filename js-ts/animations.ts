import { keyframes } from "styled-components";

export const slideUp = keyframes`
  from {
    transform: translateY(2rem);
  }

  to {
    transform: translateY(0);
  }
`;

export const fadeAndSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(2rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeAndSlideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const float = keyframes`
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to: {
    opacity: 1;
  }
`;


export const swell = keyframes`
  0% {
    transform: scale(1);
  }

  95% {
    transform: scale(1.04);
  }

  100% {
    transform: scale(1.03);
  }

`;

