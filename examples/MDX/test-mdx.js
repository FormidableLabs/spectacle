import React from 'react';
import slides from './slides.mdx';
import Deck from '../../src/components/Deck';
import Slide from '../../src/components/Slide';

import { MDXProvider } from '@mdx-js/react';

/*
 * Note: you can add mappings here to customize how
 * MDX will render standard markdown tags
 */
const components = {
  // h5: MyH5Component
};

const MDXTest = () => (
  <MDXProvider components={components}>
    <Deck loop>
      {slides.map((S, i) => (
        <Slide key={`slide-${i}`} slideNum={i}>
          <S />
        </Slide>
      ))}
    </Deck>
  </MDXProvider>
);

export default MDXTest;
