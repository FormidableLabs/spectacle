import styled from 'styled-components';

interface Bounce {
  bouncing: boolean;
}

export const BounceAnimation = styled.span<Bounce>`
  display: block;
  transition: all 0.1s;
  transform: ${(props) =>
    props.bouncing ? 'translateY(-0.6rem)' : 'translateY(0)'};
`;
