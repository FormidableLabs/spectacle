import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import styled from 'react-emotion';

const Button = styled.button`
  display: inline-block;
  appearance: none;
  background: none;
  border: none;
  outline: 0;
  color: inherit;
  padding: 0;
  cursor: pointer;

  > svg {
    height: 1.5em;
    width: 1.5em;
  }
`;

const FullscreenButton = ({ isFullscreen, ...props }) => (
  <Button aria-label="Toggle full screen" {...props}>
    <svg viewBox="0 0 512 512">
      <path
        fill={get(props, 'styles.fill', 'currentColor')}
        d={
          isFullscreen
            ? 'M64 371.2h76.795V448H192V320H64v51.2zm76.795-230.4H64V192h128V64h-51.205v76.8zM320 448h51.2v-76.8H448V320H320v128zm51.2-307.2V64H320v128h128v-51.2h-76.8z'
            : 'M396.795 396.8H320V448h128V320h-51.205zM396.8 115.205V192H448V64H320v51.205zM115.205 115.2H192V64H64v128h51.205zM115.2 396.795V320H64v128h128v-51.205z'
        }
      />
    </svg>
  </Button>
);

FullscreenButton.propTypes = {
  isFullscreen: PropTypes.bool,
  styles: PropTypes.object
};

export default FullscreenButton;
