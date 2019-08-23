import React from 'react';
import { render } from 'react-dom';
import { MDXProvider } from '@mdx-js/react';
import Deck from '../src/components/deck';
import Slide from '../src/components/slide';

// See the webpack config to see how this import alias is made
import slides, { notes } from 'spectacle-user-mdx';

const components = {};

const MDXSlides = () => (
  <Deck loop>
    {slides.map((S, i) => {
      const NotesForSlide = notes[i];
      return (
        <Slide key={`slide-${i}`} slideNum={i}>
          <MDXProvider components={components}>
            <S />
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
