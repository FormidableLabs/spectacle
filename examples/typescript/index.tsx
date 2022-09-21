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

const Presentation = () => (
  <Deck theme={theme} template={template}>
    <SlideLayout.ThreeUpImage
      primary={{
        src: formidableDogs.madden,
        alt: 'madden the dog looking regal',
        imgProps: { style: { objectFit: 'contain' } },
        position: 'right'
      }}
      top={{
        src: formidableDogs.madden,
        alt: 'madden the dog looking regal'
      }}
      bottom={{
        src: formidableDogs.madden,
        alt: 'madden the dog looking regal'
      }}
    />
    <SlideLayout.HorizontalImage
      src={formidableDogs.madden}
      title={'Madden the dog is so cute'}
      description={'We love him'}
      alt={'Studio portrait of Madden the dog.'}
    />
    <SlideLayout.HorizontalImage
      src={formidableDogs.neve}
      title={'Neve the dog is so cute'}
      description={'We love him'}
      alt={'Neve the dog panting while laying in a garden bed.'}
    />
    <SlideLayout.HorizontalImage
      src={formidableDogs.beau}
      title={'Beau the dog is so cute'}
      description={'We love him'}
      alt={'Beau the dog on an upholstered chair looking at the camera.'}
    />
    <SlideLayout.HorizontalImage
      src={formidableDogs.rusty}
      title={'Fred the dog is so cute'}
      description={'We love him'}
      imgContainerProps={{ style: { border: '8px white solid' } }}
      alt={'Rusy the dog wearing a scarf.'}
    />
    <SlideLayout.ThreeUpImage
      primary={{ src: formidableDogs.odie, alt: 'Odie on a beach' }}
      top={{ src: formidableDogs.lucy, alt: 'Lucy sitting' }}
      bottom={{ src: formidableDogs.madden, alt: 'Madden the dog.' }}
    />
    <SlideLayout.ThreeUpImage
      primary={{
        src: formidableDogs.beau,
        alt: 'Beau the dog laying on the couch looking at the camera.',
        position: 'left',
        imgContainerProps: { style: { border: '8px white solid' } }
      }}
      top={{
        src: formidableDogs.madden,
        alt: 'Madden the dog with a seriously regal look on his face.',
        imgContainerProps: { style: { border: '8px white solid' } }
      }}
      bottom={{
        src: formidableDogs.neve,
        alt: 'Neve the dog laying in a flower bed.',
        imgContainerProps: { style: { border: '8px white solid' } }
      }}
    />
    <SlideLayout.ThreeUpImage
      primary={{
        src: formidableDogs.neve,
        position: 'left',
        alt: 'Neve in a flower bed'
      }}
      top={{ src: formidableDogs.rusty, alt: 'Rusty wearing a scarf' }}
      bottom={{ src: formidableDogs.fred, alt: 'Fred looking at the camera' }}
    />
    <SlideLayout.ThreeUpImage
      primary={{
        src: formidableDogs.madden,
        position: 'left',
        alt: 'Madden the dog'
      }}
      top={{ src: formidableDogs.lucy, alt: 'Lucy sitting and panting' }}
      bottom={{ src: formidableDogs.boba, alt: 'Boba panting' }}
    />
    <SlideLayout.VerticalImage
      src={formidableDogs.sophie}
      listItems={['Roux', 'fred', 'penelope', 'odie']}
      position={'right'}
      alt={'A stack of treats sitting atop Lucys nose.'}
    />
    <SlideLayout.VerticalImage
      src={formidableDogs.odie}
      listItems={['Roux', 'fred', 'penelope', 'odie']}
      position={'right'}
      alt={'Odie the dog'}
    />
    <SlideLayout.VerticalImage
      src={formidableDogs.odie}
      listItems={['Roux', 'fred', 'penelope', 'odie']}
      title={'The dogs'}
      alt={'Odie the dog'}
    />
    <SlideLayout.VerticalImage
      src={formidableDogs.lucy}
      listItems={['Roux', 'fred', 'penelope', 'odie']}
      title={'The dogs'}
      alt={'Lucy the dog'}
    />
    <SlideLayout.VerticalImage
      src={formidableDogs.lucy}
      listItems={['Roux', 'fred', 'penelope', 'Lucy']}
      alt={'Lucy the dog'}
    />
    <SlideLayout.VerticalImage
      src={formidableDogs.sophie}
      listItems={['Roux', 'fred', 'penelope', 'odie']}
      title={'The dogs'}
      imgContainerProps={{ style: { border: '8px white solid' } }}
      alt={'Lucy balancing treats on their nose'}
    />
    <SlideLayout.FullBleedImage
      src={formidableDogs.fred}
      imgContainerProps={{ style: { border: '8px white solid' } }}
      alt={'Fred looking at the camera'}
    />
    <SlideLayout.FullBleedImage
      src={formidableDogs.penelope}
      alt={'Penelope the dog'}
    />
    <SlideLayout.FullBleedImage
      src={formidableDogs.otis}
      alt={'Otis the dog'}
    />
    <SlideLayout.FullBleedImage
      src={formidableDogs.odie}
      alt={'Odie the dog'}
    />
    <SlideLayout.FullBleedImage
      src={formidableDogs.boba}
      alt={'Boba the dog'}
    />
    <Slide>
      <FlexBox height="100%">
        <SpectacleLogo size={500} />
      </FlexBox>
      <Notes>
        Spectacle supports notes per slide.
        <ol>
          <li>Notes can now be HTML markup!</li>
          <li>Lists can make it easier to make points.</li>
        </ol>
      </Notes>
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
      transition={{
        from: {
          transform: 'scale(0.5) rotate(45deg)',
          opacity: 0
        },
        enter: {
          transform: 'scale(1) rotate(0)',
          opacity: 1
        },
        leave: {
          transform: 'scale(0.2) rotate(315deg)',
          opacity: 0
        }
      }}
      backgroundColor="tertiary"
      backgroundImage="url(https://github.com/FormidableLabs/dogs/blob/main/src/beau.jpg?raw=true)"
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
        <Appear priority={0}>
          <ListItem>
            Just identify the order with the prop <CodeSpan>priority</CodeSpan>!
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
    <Slide>
      <CodePane language="jsx">{`
        import { createClient, Provider } from 'urql';

        const client = createClient({ url: 'https://0ufyz.sse.codesandbox.io' });

        const App = () => (
          <Provider value={client}>
            <Todos />
          </Provider>
        );
        `}</CodePane>
      <Box height={20} />
      <CodePane language="java" showLineNumbers={false}>{`
        public class NoLineNumbers {
          public static void main(String[] args) {
            System.out.println("Hello");
          }
        }
        `}</CodePane>
    </Slide>
    <div>
      <Slide>
        <Heading>This is a slide embedded in a div</Heading>
      </Slide>
    </div>
    <MarkdownSlide componentProps={{ color: 'yellow' }}>
      {`
        # This is a Markdown Slide

        - You can pass props down to all elements on the slide.
        - Just use the \`componentProps\` prop.
        `}
    </MarkdownSlide>
    <MarkdownSlide animateListItems>
      {`
       # This is also a Markdown Slide

       It uses the \`animateListItems\` prop.

       - Its list items...
       - ...will appear...
       - ...one at a time.
      `}
    </MarkdownSlide>
    <Slide>
      <Grid
        gridTemplateColumns="50% 50%"
        gridTemplateRows="50% 50%"
        height="100%"
      >
        <FlexBox alignItems="center" justifyContent="center">
          <Heading>This is a 4x4 Grid</Heading>
        </FlexBox>
        <FlexBox alignItems="center" justifyContent="center">
          <Text textAlign="center">
            With all the content aligned and justified center.
          </Text>
        </FlexBox>
        <FlexBox alignItems="center" justifyContent="center">
          <Text textAlign="center">
            It uses Spectacle <CodeSpan>{'<Grid />'}</CodeSpan> and{' '}
            <CodeSpan>{'<FlexBox />'}</CodeSpan> components.
          </Text>
        </FlexBox>
        <FlexBox alignItems="center" justifyContent="center">
          <Box width={200} height={200} backgroundColor="secondary" />
        </FlexBox>
      </Grid>
    </Slide>
    <MarkdownSlideSet>
      {`
        # This is the first slide of a Markdown Slide Set
        ---
        # This is the second slide of a Markdown Slide Set
        `}
    </MarkdownSlideSet>
    <SlideLayout.List
      title="Slide layouts!"
      items={['Two-column', 'Lists', 'And more!']}
      animateListItems
    />
  </Deck>
);

const root = createRoot(document.getElementById('root')!);
root.render(<Presentation />);
