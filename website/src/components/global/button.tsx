import styled from 'styled-components';
import { Link } from 'react-router-dom';

type LinkProps = {
  light: boolean;
  noMargin?: boolean;
};

export const Button = styled(Link)<LinkProps>`
  background: ${(p) =>
    p.light ? p.theme.colors.button : p.theme.colors.buttonLight};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${(p) =>
    p.light ? p.theme.colors.textLight : p.theme.colors.textDark};
  display: block;
  font-size: 1.5rem;
  height: 4.5rem;
  letter-spacing: 0.05em;
  line-height: 4.5rem;
  margin: ${({ noMargin }) => (noMargin ? '0' : '5rem auto 3rem')};
  max-width: 30rem;
  min-width: 22rem;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.4s;
  width: auto;
  padding-left: 2rem;
  padding-right: 2rem;
  &:hover {
    background: ${(p) =>
      p.light ? p.theme.colors.buttonHover : p.theme.colors.buttonLightHover};
    color: ${(p) =>
      p.light ? p.theme.colors.textLight : p.theme.colors.textDark};
  }
  &:active {
    opacity: 0.6;
  }
`;
