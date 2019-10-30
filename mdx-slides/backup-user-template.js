import React from 'react';

import { FlexBox, Text, Box, Image } from '../src/';

const formidableLogo = require('../examples/js/formidable.png');

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
    <Box padding={10}>
      <Image src={formidableLogo} width={100} />
    </Box>
  </FlexBox>
);

export default Template;