import { forwardRef, useContext } from 'react';
import styled from 'styled-components';
import { DeckContext } from './deck/deck';
import { position, PositionProps } from 'styled-system';

const DEFAULT_PROGRESS_CIRCLE_SIZE = 10;
export const PROGRESS_CIRCLE_BORDER_WIDTH = 1;
const DEFAULT_PROGRESS_CIRCLE_MARGIN = DEFAULT_PROGRESS_CIRCLE_SIZE / 3;
export const DEFAULT_PROGRESS_CIRCLE_WIDTH_INCLUDING_MARGIN =
  DEFAULT_PROGRESS_CIRCLE_SIZE +
  (PROGRESS_CIRCLE_BORDER_WIDTH + DEFAULT_PROGRESS_CIRCLE_MARGIN) * 2;

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
  ({ color = '#fff', size = DEFAULT_PROGRESS_CIRCLE_SIZE, ...props }, ref) => {
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
              margin={DEFAULT_PROGRESS_CIRCLE_MARGIN}
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
