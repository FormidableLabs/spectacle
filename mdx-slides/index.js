import React from 'react';
import { render } from 'react-dom';
import { MDXProvider } from '@mdx-js/react';
import { Deck, Slide } from '../src/components';

// See the webpack config to see how this import alias is made
import slides, { notes } from 'spectacle-user-mdx';
import mdxComponentMap from '../src/utils/mdx-component-mapper';

const MDXSlides = () => (
  <Deck loop>
    {slides.map((MDXSlide, i) => {
      const NotesForSlide = notes[i];
      return (
        <Slide key={`slide-${i}`} slideNum={i}>
          <MDXProvider components={mdxComponentMap}>
            <MDXSlide />
            <div
              style={{ height: 5, width: '100%', backgroundColor: 'black' }}
            />
            <NotesForSlide />
          </MDXProvider>
        </Slide>
      );
    })}
  </Deck>
);

render(<MDXSlides />, document.getElementById('root'));
