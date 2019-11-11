import styled from 'styled-components';

/**
 * This button is for internal controls like the presenter display.
 * It uses Formidable Spectacle-branded colors.
 */
const InternalButton = styled('button')`
  background: #333;
  border: 1px solid hsla(0, 0%, 0%, 0.4);
  border-radius: 2px;
  color: #fff;
  box-shadow: inset 1px 1px 0 hsla(0, 0%, 100%, 0.1),
    1px 1px 0 hsla(0, 0%, 0%, 0.1);
  padding: 3px 20px;
  font-size: 14px;
  font-weight: bold;

  &:active {
    box-shadow: inset 1px 1px 0 hsla(0, 0%, 0%, 0.25),
      1px 1px 0 hsla(0, 0%, 0%, 0.1);
  }
`;

export default InternalButton;
