import styled from 'styled-components';
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

const Box = styled('div')(
  compose(
    space,
    layout,
    position,
    color,
    border
  )
);

const FlexBox = styled('div')(
  compose(
    layout,
    space,
    flexbox,
    position,
    border,
    color
  )
);

FlexBox.defaultProps = {
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex'
};

const Grid = styled('div')(
  compose(
    layout,
    grid,
    position
  )
);

Grid.defaultProps = {
  display: 'grid'
};

export { Box, FlexBox, Grid };
