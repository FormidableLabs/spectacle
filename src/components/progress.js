import * as React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { DeckContext } from './deck/deck';

export const Circle = styled('div')`
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

const Container = styled('div')`
  @media print {
    display: none;
  }
`;

const Progress = React.forwardRef((props, ref) => {
  const { slideCount, skipTo, activeView } = React.useContext(DeckContext);
  return (
    <Container ref={ref} className="spectacle-progress-indicator">
      {Array(slideCount)
        .fill(0)
        .map((_, idx) => (
          <Circle
            key={`progress-circle-${idx}`}
            color={props.color}
            active={activeView.slideIndex === idx}
            size={props.size}
            onClick={() =>
              skipTo({
                slideIndex: idx,
                stepIndex: 0
              })
            }
            data-testid="Progress Circle"
          />
        ))}
    </Container>
  );
});

Progress.displayName = 'Progress';

Progress.propTypes = {
  color: propTypes.string,
  size: propTypes.number
};

Progress.defaultProps = {
  color: '#fff',
  size: 10
};

export default Progress;
