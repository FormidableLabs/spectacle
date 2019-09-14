import React from 'react';
import { render } from 'react-dom';
import { MDXProvider } from '@mdx-js/react';
import {
  Deck,
  Slide,
  Notes,
  FlexBox,
  Text,
  Box,
  Image
} from '../src/components';
const formidableLogo = require('../examples/js/formidable.png');

// See the webpack config to see how this import alias is made
import slides, { notes } from 'spectacle-user-mdx';
import mdxComponentMap from '../src/utils/mdx-component-mapper';

const MDXSlides = () => (
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
    {slides.map((MDXSlide, i) => {
      const NotesForSlide = notes[i];
      return (
        <Slide key={`slide-${i}`} slideNum={i}>
          <MDXProvider components={mdxComponentMap}>
            <MDXSlide />
            <Notes>
              <NotesForSlide />
            </Notes>
          </MDXProvider>
        </Slide>
      );
    })}
  </Deck>
);

render(<MDXSlides />, document.getElementById('root'));
