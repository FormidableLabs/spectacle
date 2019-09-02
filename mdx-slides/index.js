import React from 'react';
import { render } from 'react-dom';
import { MDXProvider } from '@mdx-js/react';
import Deck from '../src/components/deck';
import Slide from '../src/components/slide';

// See the webpack config to see how this import alias is made
import slides, { notes } from 'spectacle-user-mdx';
import NotesContainer from '../src/components/notes-container';

const components = {};

const MDXSlides = () => (
  <Deck loop>
    {slides.map((MDXSlide, i) => {
      const NotesForSlide = notes[i];
      return (
        <Slide key={`slide-${i}`} slideNum={i}>
          <MDXProvider components={components}>
            <MDXSlide />
            <NotesContainer>
              <NotesForSlide />
            </NotesContainer>
          </MDXProvider>
        </Slide>
      );
    })}
  </Deck>
);

render(<MDXSlides />, document.getElementById('root'));
