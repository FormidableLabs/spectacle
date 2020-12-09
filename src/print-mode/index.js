import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Deck from '../components/deck/deck';

const Backdrop = styled.div`
  background-color: white;
`;

export default function PrintMode({ children, theme }) {
  return (
    <Deck printMode disableInteractivity theme={{ ...theme, Backdrop }}>
      {children}
    </Deck>
  );
}

PrintMode.propTypes = {
  theme: propTypes.object,
  children: propTypes.node.isRequired
};
