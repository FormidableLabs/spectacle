import styled from 'styled-components';
import { compose, grid, flexbox, layout, position, color } from 'styled-system';

const Box = styled('div')(
  compose(
    layout,
    position,
    color
  )
);

const FlexBox = styled('div')(
  compose(
    layout,
    flexbox,
    position
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
