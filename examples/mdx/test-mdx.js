import React from 'react';
import slides from './slides.mdx';
import { Deck, Text, FlexBox, Box, Image, Slide } from '../../src/components';
import { MDXProvider } from '@mdx-js/react';
import mdxComponentMap from '../../src/utils/mdx-component-mapper';
const formidableLogo = require('../js/formidable.png');

const MDXTest = () => (
  <MDXProvider components={mdxComponentMap}>
    <Deck
      loop
      template={({ numberOfSlides, slideNumber }) => (
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
      )}
    >
      {slides.map((S, i) => (
        <Slide key={`slide-${i}`} slideNum={i}>
          <S />
        </Slide>
      ))}
    </Deck>
  </MDXProvider>
);

export default MDXTest;
