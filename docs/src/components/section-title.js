import styled from 'styled-components';

export const SectionTitle = styled.h2`
  color: ${p => (p.light ? p.theme.colors.textLight : '#4e4e4e')};
  font-size: 2.5rem;
  flex: auto;
  line-height: 1.3;
  margin: 2rem 0 3rem;
  width: 100%;
  text-align: center;
  @media ${p => p.theme.media.sm} {
    margin: 2rem 0 6rem;
  }
  @media (max-width: 768px) {
    margin: 4rem 0;
  }
`;
