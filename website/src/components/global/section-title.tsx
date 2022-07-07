import styled from 'styled-components';

type SectionTitle = {
  light?: boolean;
};

export const SectionTitle = styled.h2<SectionTitle>`
  color: ${(p) =>
    p.light ? p.theme.colors.textDark : p.theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  flex: auto;
  line-height: 1.3;
  margin: 2rem 0 3rem;
  width: 100%;
  text-align: center;
  @media ${({ theme }) => theme.media.sm} {
    margin: 2rem 0 6rem;
  }
  @media (max-width: 768px) {
    margin: 4rem 0;
  }
`;
