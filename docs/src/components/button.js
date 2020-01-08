import styled from 'styled-components';
import { Link } from 'react-static';

export const Button = styled(Link)`
  background: ${props => (props.light ? 'white' : '#4e4e4e')};
  color: ${props => (props.light ? '#4e4e4e' : 'white')};
  display: block;
  font-size: 1.5rem;
  height: 4rem;
  letter-spacing: 0.05em;
  line-height: 4rem;
  margin: ${props => (props.noMargin ? '0' : '5rem auto 3rem')};
  max-width: 21rem;
  min-width: 10rem;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.4s;
  width: 100%;
  &:hover {
    background: ${props => (props.light ? '#fc6986' : '#333')};
  }
  &:active {
    opacity: 0.6;
  }
`;
