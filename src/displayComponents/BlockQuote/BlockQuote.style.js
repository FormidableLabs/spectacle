import styled, { css } from 'styled-components';

const StyledBlockQuoteContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledBlockQuote = styled.div`
  display: block;
  font-size: ${props => (props.fontSize ? props.fontSize : css`10vw`)};
  color: ${props => (props.color? props.color: props.theme.primaryTextColor)}
  font-family: ${props => (props.font ? props.font : props.theme.font)};
  text-align: center;
  margin: 2rem;
`;

export { StyledBlockQuote, StyledBlockQuoteContainer };
