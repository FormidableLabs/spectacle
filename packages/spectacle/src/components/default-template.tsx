import React from 'react';
import { Box, FlexBox } from './layout-primitives';
import FullScreen from './fullscreen';
import AnimatedProgress from './animated-progress';

type Props = {
  color?: string;
};
export const DefaultTemplate = ({ color = '#fff' }: Props) => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Box padding="0 1em">
      <FullScreen color={color} />
    </Box>
    <Box padding="1em">
      <AnimatedProgress color={color} />
    </Box>
  </FlexBox>
);
