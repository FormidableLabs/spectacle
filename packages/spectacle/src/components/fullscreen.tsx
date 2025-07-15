import { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { position } from 'styled-system';

import { useToggleFullScreen } from '../hooks/use-full-screen';

type FSProps = {
  color?: string;
  size?: number;
};

const Container = styled('div')`
  ${position}
  @media print {
    display: none;
  }
`;

const FullScreen = forwardRef<HTMLDivElement, FSProps>(
  ({ size = 24, color = '#fff', ...props }, ref) => {
    const toggleFullScreen = useToggleFullScreen();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
      <Container
        ref={ref}
        className="spectacle-fullscreen-button"
        onClick={toggleFullScreen}
        style={{ pointerEvents: 'all' }}
        {...props}
      >
        <svg width={size} height={size} viewBox="0 0 512 512">
          <path
            fill={color}
            d={
              !!document.fullscreenElement || document.webkitIsFullScreen
                ? 'M64 371.2h76.795V448H192V320H64v51.2zm76.795-230.4H64V192h128V64h-51.205v76.8zM320 448h51.2v-76.8H448V320H320v128zm51.2-307.2V64H320v128h128v-51.2h-76.8z'
                : 'M396.795 396.8H320V448h128V320h-51.205zM396.8 115.205V192H448V64H320v51.205zM115.205 115.2H192V64H64v128h51.205zM115.2 396.795V320H64v128h128v-51.205z'
            }
          />
        </svg>
      </Container>
    );
  }
);

FullScreen.displayName = 'Fullscreen';

export default FullScreen;
