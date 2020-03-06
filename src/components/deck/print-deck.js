import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SlidesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PrintDeck = ({ children }) => (
  <SlidesContainer>{children}</SlidesContainer>
);

PrintDeck.propTypes = {
  children: PropTypes.node.isRequired
};
