import React from 'react';
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

const FullscreenButton = props => (
  <Button aria-label="Toggle full screen" {...props}>
    <svg viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="currentColor" />
    </svg>
  </Button>
);

export default FullscreenButton;
