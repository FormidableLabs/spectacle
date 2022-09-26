import React from 'react';
import {
  FlexBox,
  Heading,
  SpectacleLogo,
  UnorderedList,
  CodeSpan,
  OrderedList,
  ListItem,
  FullScreen,
  AnimatedProgress,
  Appear,
  Slide,
  Deck,
  Text,
  Grid,
  Box,
  Image,
  CodePane,
  MarkdownSlide,
  MarkdownSlideSet,
  Notes,
  SlideLayout
} from 'spectacle';
import { createRoot } from 'react-dom/client';

const formidableLogo =
  'https://avatars2.githubusercontent.com/u/5078602?s=280&v=4';

const formidableDogs = {
  sophie:
    'https://raw.githubusercontent.com/FormidableLabs/dogs/main/src/sophie.jpg',
  lucy: 'https://raw.githubusercontent.com/FormidableLabs/dogs/main/src/lucy.jpg',
  boba: 'https://raw.githubusercontent.com/FormidableLabs/dogs/main/src/boba.jpg',
  otis: 'https://raw.githubusercontent.com/FormidableLabs/dogs/main/src/otis.jpg',
  penelope:
    'https://raw.githubusercontent.com/FormidableLabs/dogs/main/src/penelope.jpg',
  odie: 'https://raw.githubusercontent.com/FormidableLabs/dogs/main/src/odie.jpg',
  fred: 'https://raw.githubusercontent.com/FormidableLabs/dogs/main/src/fred.jpg',
  islay:
    'https://raw.githubusercontent.com/FormidableLabs/dogs/main/src/islay.jpg',
  beau: 'https://raw.githubusercontent.com/FormidableLabs/dogs/main/src/beau.jpg',
  rusty:
    'https://raw.githubusercontent.com/FormidableLabs/dogs/main/src/rusty.jpg',
  madden:
    'https://raw.githubusercontent.com/FormidableLabs/dogs/main/src/madden.jpg',
  neve: 'https://raw.githubusercontent.com/FormidableLabs/dogs/main/src/neve.jpg'
};

// SPECTACLE_CLI_THEME_START
const theme = {
  fonts: {
    header: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: '"Open Sans Condensed", Helvetica, Arial, sans-serif'
  }
};
// SPECTACLE_CLI_THEME_END

// SPECTACLE_CLI_TEMPLATE_START
const template = () => (
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
      <AnimatedProgress />
    </Box>
  </FlexBox>
);
// SPECTACLE_CLI_TEMPLATE_END

const SlideFragments = () => (
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

const codeExample = `
    <SlideLayout.MultiCodeLayout
      numColumns={2}
      title={'How to JavaScript'}
      codeBlocks={[
        {
          code: 'let greeting = 'hello Spectacle.',
          language: 'jsx',
          description: 'assign a variable to a string',
          descriptionProps: { color: 'quaternary' }
        },
        {
          code: 'greeting = 'hello again Spectacle.',
          language: 'jsx',
          description: 'reassign the variable',
          descriptionProps: { color: 'quaternary' }
        }
      ]}
    />`;

const Presentation = () => (
  <Deck theme={theme} template={template}>
    <SlideLayout.Full>
      <Heading>Welcome to Spectacle</Heading>
      <Text textAlign="center">Full Layout provides an blank slate.</Text>
    </SlideLayout.Full>
    <SlideLayout.Center>
      <Text>Center Layout centers content of any kind. </Text>
    </SlideLayout.Center>
    <SlideLayout.Section>Great for title pages!</SlideLayout.Section>
    <SlideLayout.Statement>
      Great for title pages and statements.
    </SlideLayout.Statement>
    <SlideLayout.TwoColumn
      left={
        <>
          <Heading>Left</Heading>{' '}
          <Text>{`Formatted columns make a big impact.`}</Text>
          <Text>{`Let's try...`}</Text>
        </>
      }
      right={
        <>
          <Heading>Right</Heading>
          <Text fontWeight="bold">
            {`I've learned that people will forget what you said, people will
            forget what you did, but people will never forget how you made them
            feel.`}
          </Text>
          <Text fontWeight="bold">{` -Maya Angelou`}</Text>
        </>
      }
    />
    <SlideLayout.BigFact factInformation={'We earned 100%!'}>
      100%
    </SlideLayout.BigFact>
    <SlideLayout.Quote attribution={'William Shakespeare'}>
      To be, or not to be...
    </SlideLayout.Quote>
    <SlideLayout.Quote
      quoteProps={{ fontSize: '68px' }}
      attribution={'Maya Angelou'}
      attributionProps={{ fontSize: '48px' }}
    >
      {`I've learned that people will forget what you said, people will forget
      what you did, but people will never forget how you made them feel.`}
    </SlideLayout.Quote>
    <SlideLayout.Code
      language={'jsx'}
      title={
        'Here is an example of the SlideLayout code used to generate the next slide.'
      }
      titleProps={{ fontSize: '38px' }}
    >
      {codeExample}
    </SlideLayout.Code>
    <SlideLayout.MultiCodeLayout
      numColumns={2}
      title={'How to JavaScript'}
      codeBlocks={[
        {
          code: `let greeting = 'hello Spectacle.'`,
          language: `jsx`,
          description: `assign a variable to a string`,
          descriptionProps: { color: 'quaternary' }
        },
        {
          code: `greeting = 'hello again Spectacle.'`,
          language: `jsx`,
          description: `reassign the variable`,
          descriptionProps: { color: 'quaternary' }
        }
      ]}
    />
    <SlideLayout.HorizontalImage
      src={formidableDogs.neve}
      title={'Show me the dogs!'}
      alt={'Neve the dog panting while laying in a garden bed.'}
    />
    <SlideLayout.HorizontalImage
      src={formidableDogs.madden}
      title={'Madden the dog is so cute'}
      description={'We love him'}
      alt={'Studio portrait of Madden the dog.'}
    />
    <SlideLayout.ThreeUpImage
      primary={{
        src: formidableDogs.beau,
        alt: 'Beau the dog laying on the couch looking at the camera.',
        position: 'left'
      }}
      top={{
        src: formidableDogs.madden,
        alt: 'Madden the dog with a seriously regal look on his face.'
      }}
      bottom={{
        src: formidableDogs.neve,
        alt: 'Neve the dog laying in a flower bed.'
      }}
    />
    <SlideLayout.VerticalImage
      src={formidableDogs.odie}
      listItems={[
        'Odie the dog',
        'color of sand',
        'super wet dog',
        'super happy pup'
      ]}
      position={'right'}
      alt={'Odie the dog'}
    />
    <SlideLayout.VerticalImage
      src={formidableDogs.lucy}
      listItems={['Good girl', 'Happy dog', 'Spotty', 'Silly']}
      title={'Lucy'}
      alt={'Lucy the dog'}
    />
    <SlideLayout.FullBleedImage
      src={formidableDogs.fred}
      imgContainerProps={{ style: { border: '8px white solid' } }}
      alt={'Fred looking at the camera'}
    />
    <SlideLayout.FullBleedImage
      src={formidableDogs.madden}
      alt={'Madden the dog'}
    />
  </Deck>
);

const root = createRoot(document.getElementById('root')!);
root.render(<Presentation />);
