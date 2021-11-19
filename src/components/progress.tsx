import * as React from 'react';
import styled from 'styled-components';
import { DeckContext } from './deck/deck';

export type CircleProps = { size: number; color: string; active: boolean };
export const Circle = styled.div<CircleProps>`
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

const Container = styled.div`
  @media print {
    display: none;
  }
`;

export type ProgressProps = {
  color?: string;
  size?: number;
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ color = '#fff', size = 10 }, ref) => {
    const { slideCount, skipTo, activeView } = React.useContext(DeckContext);
    return (
      <Container ref={ref} className="spectacle-progress-indicator">
        {Array(slideCount)
          .fill(0)
          .map((_, idx) => (
            <Circle
              key={`progress-circle-${idx}`}
              color={color}
              active={activeView.slideIndex === idx}
              size={size}
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
  }
);

Progress.displayName = 'Progress';

export default Progress;
