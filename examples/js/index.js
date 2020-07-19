import React from 'react';
import ReactDOM from 'react-dom';

import {
  FlexBox,
  Heading,
  SpectacleLogo,
  UnorderedList,
  CodeSpan,
  OrderedList,
  ListItem,
  Appear,
  Slide,
  Deck,
  Text,
  Grid,
  Box,
  Image
} from 'spectacle';

const formidableLogo =
  'https://avatars2.githubusercontent.com/u/5078602?s=280&v=4';

const theme = {
  fonts: {
    header: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: '"Open Sans Condensed", Helvetica, Arial, sans-serif'
  }
};

function SlideFragments() {
  return (
    <>
      <Slide>
        <Text>This is a slide fragment.</Text>
      </Slide>
      <Slide>
        <Text>This is also a slide fragment.</Text>
        <Appear>
          <Text>This item shows up!</Text>
        </Appear>
        <Appear>
          <Text>This item also shows up!</Text>
        </Appear>
      </Slide>
    </>
  );
}

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
        backgroundImage="url(https://github.com/FormidableLabs/dogs/blob/main/beau.jpg?raw=true)"
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
      <Slide>
        <Heading>Animated Elements</Heading>
        <OrderedList>
          <Appear>
            <ListItem>Elements can animate in!</ListItem>
          </Appear>
          <Appear>
            <ListItem>Out of order</ListItem>
          </Appear>
          <Appear>
            <ListItem>
              Just identify the order with the prop{' '}
              <CodeSpan>stepIndex</CodeSpan>!
            </ListItem>
          </Appear>
        </OrderedList>
      </Slide>
      <Slide>
        <FlexBox>
          <Text>These</Text>
          <Text>Text</Text>
          <Text color="secondary">Items</Text>
          <Text fontWeight="bold">Flex</Text>
        </FlexBox>
        <Grid gridTemplateColumns="1fr 2fr" gridColumnGap={15}>
          <Box backgroundColor="primary">
            <Text color="secondary">Single-size Grid Item</Text>
          </Box>
          <Box backgroundColor="secondary">
            <Text>Double-size Grid Item</Text>
          </Box>
        </Grid>
        <Grid
          gridTemplateColumns="1fr 1fr 1fr"
          gridTemplateRows="1fr 1fr 1fr"
          alignItems="center"
          justifyContent="center"
          gridRowGap={1}
        >
          {Array(9)
            .fill('')
            .map((_, index) => (
              <FlexBox paddingTop={0} key={`formidable-logo-${index}`} flex={1}>
                <Image src={formidableLogo} width={100} />
              </FlexBox>
            ))}
        </Grid>
      </Slide>
      <SlideFragments />
    </Deck>
  );
}

ReactDOM.render(<Presentation />, document.getElementById('root'));
