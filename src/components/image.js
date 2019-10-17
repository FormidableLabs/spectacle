import styled, { css } from 'styled-components';
import { compose, layout, position } from 'styled-system';

const Image = styled('img')(
  compose(
    layout,
    position
  )
);

const FullSizeImage = styled(Image);

FullSizeImage.defaultProps = {
  maxWidth: '100%',
  maxHeight: '100%'
};

export { Image, FullSizeImage };
