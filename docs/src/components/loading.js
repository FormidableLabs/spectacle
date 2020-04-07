import React from 'react';
import styled, { keyframes } from 'styled-components';

import Docs from '../screens/docs';

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const Loader = styled.div`
  position: relative;
  margin: 0 auto;
  width: ${p => p.theme.spacing.xl};
  top: calc(50% - ${p => p.theme.spacing.xl});
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const Svg = styled.svg`
  animation: ${rotate} 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Circle = styled.circle`
  stroke: ${p => p.theme.colors.accent};
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${dash} 1.5s ease-in-out infinite;
  stroke-linecap: round;
`;

export const Loading = () => (
  <Docs isLoading>
    <Container>
      <Loader>
        <Svg className="circular" viewBox="25 25 50 50">
          <Circle
            className="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </Svg>
      </Loader>
    </Container>
  </Docs>
);
