import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import useResizeObserver from 'use-resize-observer';
import { Text } from '../typography';
import { CommonTypographyProps } from '../typography';

const FitContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScalableText = styled(Text)<{ scale: number }>`
  transform-origin: center left;
  transform: scale(${props => props.scale});
  white-space: nowrap;
  max-width: ${props => `${100 / props.scale}%`};
`;

export const FitText: FC<CommonTypographyProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useResizeObserver({
    ref: containerRef,
    onResize: () => {
      if (!containerRef.current || !textRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      
      if (textWidth === 0) return;
      
      const newScale = Math.min(containerWidth / textWidth, 1);
      setScale(newScale);
    }
  });

  return (
    <FitContainer ref={containerRef}>
      <ScalableText {...props} ref={textRef} scale={scale} />
    </FitContainer>
  );
};