import styled from 'styled-components';

type Stack = {
  spacingMobile: number;
  spacingTablet: number;
};

export const Stack = styled.div<Stack>`
  display: flex;
  flex-direction: column;
  > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  > * + * {
    margin-top: ${({ spacingMobile }) => `${spacingMobile}rem`};
  }
  @media ${({ theme }) => theme.media.sm} {
    > * + * {
      margin-top: ${({ spacingTablet }) => `${spacingTablet}rem`};
    }
  }
`;
