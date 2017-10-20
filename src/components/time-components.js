import { keyframes } from 'emotion';
import styled from 'react-emotion';

export const Clock = styled.h2`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  float: right;
  margin: 0;
  line-height: 1;
  display: inline-block;
  font-size: 28px;
`;

export const TimeContainer = styled.div`
  padding: 20px 0;
`;

export const TButtonContainer = styled.div`
  position: relative;
  float: right;
  padding-right: 20px;
  -webkit-transform: translateY(-45%);
  font-size: 20.088px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const vanishOut = keyframes`
  from {
    opacity: 1;
    transform-origin: 50% 50%;
    transform: scale(1,1);
    filter: blur(0px);
  }

  to {
    opacity: 0;
    transform-origin: 50% 50%;
    transform: scale(2,2);
    filter: blur(2px);
  }
`;

export const TSingleButton = styled.button`
  width: 68px;
  font-size: 1em;
  font-family: "Open Sans Condensed";
  margin: 3px;
  border: 0;
  border-radius: 15px;
  background: ${
    (props) => {
      if (props.stop) {
        return '#e23d3d';
      } else if (props.start) {
        return '#42a53c';
      } else {
        return '#darkgrey';
      }
    }};

  &:focus{
    outline:0px;
  }
  &:active {
    animation: ${vanishOut} 0.5s;
  }

  opacity: 0;  /* make things invisible upon start */
  animation: ${fadeIn} ease-in 1;
  animation-fill-mode:forwards;
  animation-duration:0.5s;
  animation-delay: 0s;
`;
