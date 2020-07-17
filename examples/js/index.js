import React from 'react';
import ReactDOM from 'react-dom';
import Deck from '../../src/components/deck/deck';
import Slide from '../../src/components/slide/slide';
import beauImage from './beau.jpg';

import {
  FlexBox,
  Heading,
  SpectacleLogo,
  UnorderedList,
  CodeSpan,
  ListItem
} from 'spectacle';

const theme = {
  fonts: {
    header: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: '"Open Sans Condensed", Helvetica, Arial, sans-serif'
  }
};

function Presentation() {
  return (
    <Deck theme={theme}>
      <Slide>
        <FlexBox height="100%">
          <SpectacleLogo size={500} />
        </FlexBox>
      </Slide>
      <Slide>
        <FlexBox height="100%" flexDirection="column">
          <Heading margin="0px" fontSize="150px">
            ✨<i>Spectacle</i> ✨
          </Heading>
          <Heading margin="0px" fontSize="h2">
            A ReactJS Presentation Library
          </Heading>
          <Heading margin="0px 32px" color="primary" fontSize="h3">
            Where you can write your decks in JSX, Markdown, or MDX!
          </Heading>
        </FlexBox>
      </Slide>
      <Slide
        backgroundColor="tertiary"
        backgroundImage={`url(${beauImage})`}
        backgroundOpacity={0.5}
      >
        <Heading>Custom Backgrounds</Heading>
        <UnorderedList>
          <ListItem>
            <CodeSpan>backgroundColor</CodeSpan>
          </ListItem>
          <ListItem>
            <CodeSpan>backgroundImage</CodeSpan>
          </ListItem>
          <ListItem>
            <CodeSpan>backgroundOpacity</CodeSpan>
          </ListItem>
          <ListItem>
            <CodeSpan>backgroundSize</CodeSpan>
          </ListItem>
          <ListItem>
            <CodeSpan>backgroundPosition</CodeSpan>
          </ListItem>
          <ListItem>
            <CodeSpan>backgroundRepeat</CodeSpan>
          </ListItem>
        </UnorderedList>
      </Slide>
    </Deck>
  );
}

ReactDOM.render(<Presentation />, document.getElementById('root'));
