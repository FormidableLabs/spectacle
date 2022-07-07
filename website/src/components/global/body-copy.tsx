import styled from 'styled-components';

type BodyCopy = {
  light?: boolean;
};

export const BodyCopy = styled.p<BodyCopy>`
  font-size: 1.5rem;
  line-height: 1.5;
  color: ${(p) => (p.light ? p.theme.colors.text : p.theme.colors.textLight)};
  text-align: center;
  margin: 0 auto;
  width: 100%;
  max-width: 80rem;
  @media (max-width: 768px) {
    p {
      text-align: center;
    }
  }
`;
