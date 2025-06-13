import { FC } from 'react';
import styled from 'styled-components';
import { compose, layout, position } from 'styled-system';
import * as SS from 'styled-system';

type ImageType = FC<
  SS.LayoutProps & SS.PositionProps & Partial<HTMLImageElement>
>;

const Image = styled.img(compose(layout, position)) as ImageType;

// Option 1: Using styled-components `attrs` method to set default props
const FullSizeImage = styled(Image).attrs<SS.LayoutProps>({
  maxWidth: '100%',
  maxHeight: '100%'
})`
  /* Additional styles can go here if needed */
` as unknown as ImageType;

// Option 2: Alternative approach using CSS defaults
// const FullSizeImage = styled(Image)`
//   max-width: 100%;
//   max-height: 100%;
// ` as unknown as ImageType;

export { Image, FullSizeImage };
