import {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react';
import styled, { keyframes, css } from 'styled-components';
import { DeckContext } from './deck/deck';
import {
  ProgressContainer,
  Circle,
  PROGRESS_CIRCLE_BORDER_WIDTH
} from './progress';

interface PacmanBaseProps {
  pacmanSize: number;
  top: number;
  left: number;
}
export const PacmanBase = styled.div<PacmanBaseProps>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  height: ${({ pacmanSize }) => pacmanSize}px;
  width: ${({ pacmanSize }) => pacmanSize}px;
  transition: left 0.3s ease-in-out 0.2s;
  transform: translate(-50%, -50%);
`;

const pacmanTopFrames = keyframes`
  0% { transform: rotateZ(0deg) }
  100% { transform: rotateZ(-30deg) }
`;
const pacmanBottomFrames = keyframes`
  0% { transform: rotateZ(0deg) }
  100% { transform: rotateZ(30deg) }
`;
// NOTE: rotateZ is 0.1 to generate two different animation names (styled components deduplication)
const pacmanTopFramesAlternate = keyframes`
  0% { transform: rotateZ(0.1deg) }
  100% { transform: rotateZ(-30deg) }
`;
// NOTE: rotateZ is 0.1 to generate two different animation names (styled components deduplication)
const pacmanBottomFramesAlternate = keyframes`
  0% { transform: rotateZ(0.1deg) }
  100% { transform: rotateZ(30deg) }
`;
interface PacmanBodyProps {
  color: string;
  pacmanSize: number;
  alternate: boolean;
}
const PacmanBodyTop = styled.div<PacmanBodyProps>`
  position: absolute;
  top: 0;
  height: ${({ pacmanSize }) => pacmanSize / 2}px;
  width: ${({ pacmanSize }) => pacmanSize}px;
  background: ${({ color }) => color};
  border-top-left-radius: ${({ pacmanSize }) => pacmanSize / 2}px;
  border-top-right-radius: ${({ pacmanSize }) => pacmanSize / 2}px;
  // NOTE: So the top and bottom always overlap when sizes are in decimals.
  box-shadow: 0 0 0 0.1px ${({ color }) => color};
  animation-name: ${({ alternate }) =>
    alternate ? pacmanTopFrames : pacmanTopFramesAlternate};
  animation-duration: 0.12s;
  animation-timing-function: linear;
  animation-iteration-count: 10;
  animation-direction: alternate;
  animation-fill-mode: both;
`;
const PacmanBodyBottom = styled(PacmanBodyTop)`
  top: 50%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: ${({ pacmanSize }) => pacmanSize / 2}px;
  border-bottom-right-radius: ${({ pacmanSize }) => pacmanSize / 2}px;
  animation-name: ${({ alternate }) =>
    alternate ? pacmanBottomFrames : pacmanBottomFramesAlternate};
`;

export type AnimatedProgressProps = {
  color?: string;
  size?: number;
  pacmanColor?: string;
};

const AnimatedProgress = forwardRef<HTMLDivElement, AnimatedProgressProps>(
  ({ color: circleColor = '#fff', size: circleSize = 7.5, ...props }, ref) => {
    const {
      slideCount,
      skipTo,
      activeView: { slideIndex }
    } = useContext(DeckContext);

    const [pacmanOffsetLeft, setPacmanOffsetLeft] = useState<number | null>(
      null
    );
    const [pacmanOffsetTop, setPacmanOffsetTop] = useState<number | null>(null);
    const [alternateAnimation, setAlternateAnimation] = useState(false);

    const [activeCircleNode, setActiveCircleNode] =
      useState<HTMLDivElement | null>(null);
    const activeCircleCallbackRef = useCallback(
      (activeCircleNode: HTMLDivElement) => {
        setActiveCircleNode(activeCircleNode);
      },
      []
    );

    useEffect(() => {
      if (activeCircleNode?.offsetParent) {
        const { offsetLeft, offsetTop } = activeCircleNode;
        const halfOfCircleOccupiedSpace =
          circleSize / 2 + PROGRESS_CIRCLE_BORDER_WIDTH;
        setPacmanOffsetLeft(offsetLeft + halfOfCircleOccupiedSpace);
        setPacmanOffsetTop(offsetTop + halfOfCircleOccupiedSpace);
        setAlternateAnimation(!alternateAnimation);
      } else {
        setPacmanOffsetLeft(null);
        setPacmanOffsetTop(null);
      }
    }, [circleSize, activeCircleNode]);

    const circleMargin = circleSize / 1.64;
    const pacmanColor = props.pacmanColor || circleColor;
    const pacmanSize =
      circleSize + PROGRESS_CIRCLE_BORDER_WIDTH + circleMargin * 2;

    return (
      <ProgressContainer
        ref={ref}
        className="spectacle-animated-progress-indicator"
        position="relative"
        {...props}
      >
        {typeof pacmanOffsetTop === 'number' &&
          typeof pacmanOffsetLeft === 'number' && (
            <PacmanBase
              pacmanSize={pacmanSize}
              top={pacmanOffsetTop}
              left={pacmanOffsetLeft}
            >
              <PacmanBodyTop
                color={pacmanColor}
                pacmanSize={pacmanSize}
                alternate={alternateAnimation}
              />
              <PacmanBodyBottom
                color={pacmanColor}
                pacmanSize={pacmanSize}
                alternate={alternateAnimation}
              />
            </PacmanBase>
          )}
        {Array(slideCount)
          .fill(0)
          .map((_, idx) => {
            const isActive = slideIndex === idx;
            return (
              <Circle
                key={idx}
                ref={isActive ? activeCircleCallbackRef : null}
                color={circleColor}
                active={isActive}
                size={circleSize}
                margin={circleMargin}
                onClick={() =>
                  skipTo({
                    slideIndex: idx,
                    stepIndex: 0
                  })
                }
                data-testid="animated-progress-circle"
              />
            );
          })}
      </ProgressContainer>
    );
  }
);

AnimatedProgress.displayName = 'AnimatedProgress';

export default AnimatedProgress;