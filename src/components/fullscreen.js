import * as React from 'react';
import propTypes from 'prop-types';

const FullScreen = props => {
  const toggleFullScreen = React.useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if ('exitFullscreen' in document) {
        document.exitFullscreen();
      }
    }
  }, []);
  return (
    <div onClick={toggleFullScreen} style={{ pointerEvents: 'all' }}>
      <svg width={props.size} height={props.size} viewBox="0 0 512 512">
        <path
          fill={props.color}
          d={
            document.fullscreenElement
              ? 'M64 371.2h76.795V448H192V320H64v51.2zm76.795-230.4H64V192h128V64h-51.205v76.8zM320 448h51.2v-76.8H448V320H320v128zm51.2-307.2V64H320v128h128v-51.2h-76.8z'
              : 'M396.795 396.8H320V448h128V320h-51.205zM396.8 115.205V192H448V64H320v51.205zM115.205 115.2H192V64H64v128h51.205zM115.2 396.795V320H64v128h128v-51.205z'
          }
        />
      </svg>
    </div>
  );
};

FullScreen.propTypes = {
  color: propTypes.string,
  size: propTypes.number
};

FullScreen.defaultProps = {
  color: '#fff',
  size: 24
};

export default FullScreen;
