import styled from 'styled-components';
import { theme } from '@site/src/theme';

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
  background: ${({ background }) => background || theme.colors.bgLight};
  text-align: center;

  @media ${(p) => p.theme.media.sm} {
    padding: ${({ noPadding }) => (noPadding ? '0' : '8rem')};
  }
`;
