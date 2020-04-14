import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled(Link)`
  background: ${({ color }) => color};
  color: ${({ text }) => text};
  display: block;
  font-size: 1.5rem;
  height: 4rem;
  letter-spacing: 0.05em;
  line-height: 4rem;
  margin: ${({ noMargin }) => (noMargin ? '0' : '5rem auto 3rem')};
  max-width: 21rem;
  min-width: 10rem;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.4s;
  width: 100%;
  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
  }
  &:active {
    opacity: 0.6;
  }
`;

Button.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
