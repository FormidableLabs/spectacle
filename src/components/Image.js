import styled, { css } from 'styled-components';
import { compose, layout, position } from 'styled-system';

const Image = styled('img')(
  compose(
    layout,
    position
  ),
  css`
    max-height: 100%;
    max-width: 100%;
  `
);

export { Image };
