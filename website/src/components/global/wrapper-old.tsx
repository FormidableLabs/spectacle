import styled from 'styled-components';

type Wrapper = {
  noMargin?: boolean;
  noPadding?: boolean;
  background: string;
};

export const Wrapper = styled.div<Wrapper>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: ${({ noMargin }) => (noMargin ? '0' : 'auto')};
  padding: ${({ noPadding }) => (noPadding ? '0' : '4rem')};
  background: ${(p) => p.theme.colors[`bg${p.background}`]};
  text-align: center;

  @media ${({ theme }) => theme.media.sm} {
    padding: ${({ noPadding }) => (noPadding ? '0' : '8rem')};
  }
`;
