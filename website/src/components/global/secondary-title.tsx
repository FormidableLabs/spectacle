import styled from 'styled-components';

type SecondaryTitle = {
  light?: boolean;
};

export const SecondaryTitle = styled.h3<SecondaryTitle>`
  color: ${(p) =>
    p.light ? p.theme.colors.textDark : p.theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  line-height: 2.4rem;
  text-align: center;
`;
