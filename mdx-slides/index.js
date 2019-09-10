import React from 'react';
import { render } from 'react-dom';
import { MDXProvider } from '@mdx-js/react';

// See the webpack config to see how this import alias is made
import slides, { notes } from 'spectacle-user-mdx';
import {
  Deck,
  Slide,
  CodePane,
  Image,
  OrderedList,
  Quote,
  Heading,
  UnorderedList,
  Text,
  ListItem,
  Notes
} from '../src/components';

const LeftAlignedHeading = props => <Heading {...props} textAlign="left" />;

const components = {
  p: Text,
  // TODO - different heading sizes
  h1: LeftAlignedHeading,
  h2: LeftAlignedHeading,
  h3: LeftAlignedHeading,
  blockquote: Quote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  // TODO - broken
  img: Image,
  codeblock: CodePane,
  // pre: CodePane
  code: CodePane
};

const MDXSlides = () => (
  <Deck loop>
    {slides.map((MDXSlide, i) => {
      const NotesForSlide = notes[i];
      return (
        <Slide key={`slide-${i}`} slideNum={i}>
          <MDXProvider components={components}>
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
