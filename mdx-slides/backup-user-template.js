import React from 'react';

import { FlexBox, Text } from '../src/';

const Template = ({ numberOfSlides, slideNumber }) => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Text fontSize={16} color="quinary" fontWeight="bold">
      Slide {slideNumber} of {numberOfSlides - 1}
    </Text>
  </FlexBox>
);

export default Template;