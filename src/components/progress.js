import * as React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { DeckContext } from '../hooks/use-deck';

const Circle = styled('div')`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: inline-block;
  border: 1px solid ${({ color }) => color};
  background: ${({ color, active }) => (active ? color : 'transparent')};
  margin: ${({ size }) => size / 3}px;
  border-radius: 50%;
  pointer-events: all;
  cursor: pointer;
`;

const Progress = props => {
  const { numberOfSlides, state, goToSlide } = React.useContext(DeckContext);
  return (
    <div>
      {Array(numberOfSlides)
        .fill(0)
        .map((_, idx) => (
          <Circle
            key={`progress-circle-${idx}`}
            color={props.color}
            active={state.currentSlide === idx}
            size={props.size}
            onClick={() => goToSlide(idx)}
          />
        ))}
    </div>
  );
};

Progress.propTypes = {
  color: propTypes.string,
  size: propTypes.number
};

Progress.defaultProps = {
  color: '#fff',
  size: 10
};

export default Progress;
