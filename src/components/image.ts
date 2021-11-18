import { FC } from 'react';
import styled from 'styled-components';
import { compose, layout, position } from 'styled-system';
import * as SS from 'styled-system';

type ImageType = FC<SS.LayoutProps & SS.PositionProps>;

const Image = styled.img(compose(layout, position)) as ImageType;
const FullSizeImage = styled(Image) as unknown as ImageType;

FullSizeImage.defaultProps = {
  maxWidth: '100%',
  maxHeight: '100%'
};

export { Image, FullSizeImage };
