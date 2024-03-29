import styled from 'styled-components';

const containerPrintStyle = `
  @media print {
    height: inherit;
  }
`;

import {
  compose,
  grid,
  flexbox,
  layout,
  position,
  border,
  color,
  space
} from 'styled-system';
import * as SS from 'styled-system';

type BoxProps = SS.LayoutProps &
  SS.SpaceProps &
  SS.PositionProps &
  SS.ColorProps &
  SS.BorderProps;

const Box = styled.div<BoxProps>(
  compose(layout, space, position, color, border),
  containerPrintStyle
);

const FlexBox = styled.div<BoxProps & SS.FlexboxProps>(
  compose(layout, space, position, color, border, flexbox),
  containerPrintStyle
);

FlexBox.defaultProps = {
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex'
};

type GridProps = SS.LayoutProps & SS.GridProps & SS.PositionProps;
const Grid = styled.div<GridProps>(
  compose(layout, grid, position),
  containerPrintStyle
);

Grid.defaultProps = {
  display: 'grid'
};

export { Box, FlexBox, Grid };
