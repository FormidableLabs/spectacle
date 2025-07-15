import { FC } from 'react';
import styled from 'styled-components';
import { compose, layout, position } from 'styled-system';
import * as SS from 'styled-system';

type ImageType = FC<
  SS.LayoutProps & SS.PositionProps & Partial<HTMLImageElement>
>;

const Image = styled.img(compose(layout, position)) as ImageType;
const FullSizeImage = styled(Image).attrs<SS.LayoutProps>((props) => ({
  maxWidth: '100%',
  maxHeight: '100%',
  ...props
})) as unknown as ImageType;

export { Image, FullSizeImage };
