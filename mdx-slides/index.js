import React from 'react';
import { render } from 'react-dom';
import { MDXProvider } from '@mdx-js/react';
import Deck from '../src/components/deck';
import Slide from '../src/components/slide';

// See the webpack config to see how this import alias is made
import slides from 'spectacle-user-mdx';

const NOTES_REG = /^Notes: /gm;
const NOTES_LEN = 'Notes: '.length;
const INITIAL_CONTENT = {
  text: [],
  notes: []
};

const parseParagraph = children => {
  if (!Array.isArray(children)) {
    return {
      text: children,
      notes: []
    };
  }

  let foundNotes = false;
  return children.reduce((prev, curr) => {
    if (foundNotes) {
      return {
        ...prev,
        notes: [...prev.notes, curr]
      };
    }

    if (typeof curr === 'string') {
      // the notes marker is only valid as part of a string (not nested within another MDX object)
      const indexOfNotes = curr.search(NOTES_REG);
      if (indexOfNotes >= 0) {
        // found the notes marker!
        foundNotes = true;

        const text = curr.substring(0, indexOfNotes);
        const notes = curr.substring(indexOfNotes + NOTES_LEN);

        return {
          text: [...prev.text, text],
          notes: [...prev.notes, notes]
        };
      }
    }

    // didn't find the notes marker, so put the child in content.text
    return {
      ...prev,
      text: [prev.text, curr]
    };
  }, INITIAL_CONTENT);
};

const Paragraph = ({ children }) => {
  const [content, setContent] = React.useState(INITIAL_CONTENT);

  React.useEffect(() => {
    const parsed = parseParagraph(children);
    console.log('parsed: ', parsed);
    setContent(parsed);
    console.log('notes: ', parsed.notes);
    // TODO - save notes
  }, [children]);

  return content.text;
};

const components = {
  p: Paragraph
};

const MDXSlides = () => (
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

render(<MDXSlides />, document.getElementById('root'));
