import React from 'react';
import { render } from 'react-dom';

import slides from './slides.mdx';
import { Deck, FlexBox, Slide, Box, Progress, FullScreen } from '../../src';
import { MDXProvider } from '@mdx-js/react';
import mdxComponentMap from '../../src/utils/mdx-component-mapper';

const MDXTest = () => (
  <MDXProvider components={mdxComponentMap}>
    <Deck
      loop
      template={() => (
        <FlexBox
          justifyContent="space-between"
          position="absolute"
          bottom={0}
          width={1}
        >
          <Box padding="0 1em">
            <FullScreen />
          </Box>
          <Box padding="1em">
            <Progress />
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

/**
 * Experiment to test MDX -> JSX transpilation through babel.
 *
 * Outputs MDXDocument, changing MDXDocument will cause webpack
 * to hot-reload with new contents.
 */
render(<MDXTest />, document.getElementById('root'));
