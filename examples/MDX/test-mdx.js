import React from './node_modules/react';
import slides from './slides.mdx';
import Deck from '../../src/components/deck';
import Slide from '../../src/components/slide';

import { MDXProvider } from './node_modules/@mdx-js/react';

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
