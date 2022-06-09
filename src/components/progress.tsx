import { forwardRef, useContext } from 'react';
import styled from 'styled-components';
import { DeckContext } from './deck/deck';
import { position, PositionProps } from 'styled-system';

export const PROGRESS_CIRCLE_BORDER_WIDTH = 1;
export type CircleProps = {
  size: number;
  margin: number;
  color: string;
  active: boolean;
};
export const Circle = styled.div<CircleProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${PROGRESS_CIRCLE_BORDER_WIDTH}px solid ${({ color }) => color};
  background: ${({ color, active }) => (active ? color : 'transparent')};
  margin: ${({ margin }) => margin}px;
  border-radius: 50%;
  pointer-events: all;
  cursor: pointer;
`;

export const ProgressContainer = styled.div<PositionProps>`
  ${position}
  display: flex;
  flex-wrap: wrap;
  @media print {
    display: none;
  }
`;

export type ProgressProps = {
  color?: string;
  size?: number;
};

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ color = '#fff', size = 10, ...props }, ref) => {
    const { slideCount, skipTo, activeView } = useContext(DeckContext);
    return (
      <ProgressContainer
        ref={ref}
        className="spectacle-progress-indicator"
        {...props}
      >
        {Array(slideCount)
          .fill(0)
          .map((_, idx) => (
            <Circle
              key={`progress-circle-${idx}`}
              color={color}
              active={activeView.slideIndex === idx}
              size={size}
              margin={size / 3}
              onClick={() =>
                skipTo({
                  slideIndex: idx,
                  stepIndex: 0
                })
              }
              data-testid="Progress Circle"
            />
          ))}
      </ProgressContainer>
    );
  }
);

Progress.displayName = 'Progress';

export default Progress;
