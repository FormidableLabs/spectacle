import styled from 'styled-components';
import { compose, layout, position } from 'styled-system';

const Image = styled('img')(
  compose(
    layout,
    position
  )
);

export { Image };
