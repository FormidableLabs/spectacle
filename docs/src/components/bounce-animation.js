import styled from 'styled-components';

export const BounceAnimation = styled.span`
  display: block;
  transition: all 0.1s;
  transform: ${props =>
    props.bouncing ? 'translateY(-0.6rem)' : 'translateY(0)'};
`;
