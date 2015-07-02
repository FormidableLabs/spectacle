import React from 'react/addons';
import {
  Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
  Heading, Image, Layout, Link, ListItem, List, Quote, S, Slide, Text
} from '../src/spectacle';

import preloader from '../src/utils/preloader';

import Interactive from './interactive';

const images = {
  city: require('./city.jpg'),
  kat: require('./kat.png'),
  logo: require('./formidable-logo.svg')
};

preloader([images.city, images.kat]);

export default class extends React.Component {
  render() {
    return (
      <Deck transition={['zoom','slide']} transitionDuration={800}>
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps textColor="black">
            Spectacle
          </Heading>
          <Heading size={1} fit caps margin="-20px 0px">
            A ReactJS Presentation Library
          </Heading>
          <Heading size={2} fit caps textColor="black">
            Where You Can Write Your Decks In JSX
          </Heading>
          <Link href="https://github.com/FormidableLabs/spectacle"><Text bold caps textColor="white">View on Github</Text></Link>
          <Text textSize="1.5em" margin="20px 0px 0px" bold>Hit Your Right Arrow To Begin!</Text>
        </Slide>
        <Slide transition={['slide']} bgColor="black">
          <Image src={images.kat.replace('/','')} margin="0px auto 40px" height="293px"/>
          <Heading size={1} fit textColor="primary" textFont="secondary">
            Wait what?
          </Heading>
        </Slide>
        <Slide transition={['zoom', 'fade']} bgColor="primary" align="center middle">
          <CodePane
            lang="javascript"
            source={require("raw!./deck.example")}
            margin="20px auto"
            textSize="1rem"/>
        </Slide>
        <Slide transition={['slide']} bgImage={images.city.replace('/','')} bgDarken={0.75}>
          <Appear>
            <Heading size={1} caps fit textColor="primary">
              Full Width
            </Heading>
          </Appear>
          <Appear>
            <Heading size={1} caps fit textColor="tertiary">
              Adjustable Darkness
            </Heading>
          </Appear>
          <Appear>
            <Heading size={1} caps fit textColor="primary">
              Background Imagery
            </Heading>
          </Appear>
        </Slide>
        <Slide transition={['zoom', 'fade']} bgColor="primary">
          <Heading caps fit>Flexible Layouts</Heading>
          <Layout>
            <Fill>
              <Heading size={4} caps textColor="black" bgColor="white" margin={10}>
                Left
              </Heading>
            </Fill>
            <Fill>
              <Heading size={4} caps textColor="black" bgColor="white" margin={10}>
                Right
              </Heading>
            </Fill>
          </Layout>
        </Slide>
        <Slide transition={['slide']} bgColor="black">
          <BlockQuote>
            <Quote>Wonderfully formatted quotes</Quote>
            <Cite>Ken Wheeler</Cite>
          </BlockQuote>
        </Slide>
        <Slide transition={['slide', 'spin']} bgColor="primary">
          <Heading caps fit size={1} textColor="white">
            Smooth
          </Heading>
          <Heading caps fit size={1} textColor="black">
            Combinable Transitions
          </Heading>
        </Slide>
        <Slide transition={['fade']} bgColor="black" textColor="primary" align="center middle">
          <List>
            <ListItem><Appear>Inline style based theme system</Appear></ListItem>
            <ListItem><Appear>Autofit text</Appear></ListItem>
            <ListItem><Appear>Flexbox layout system</Appear></ListItem>
            <ListItem><Appear>React-Router navigation</Appear></ListItem>
            <ListItem><Appear>PDF export</Appear></ListItem>
            <ListItem><Appear>And...</Appear></ListItem>
          </List>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={1} caps fit textColor="white">
            Your presentations are interactive
          </Heading>
          <Interactive/>
        </Slide>
        <Slide transition={['spin','slide']} bgColor="white">
          <Heading size={1} caps fit textColor="primary">
            Made with love in Seattle by
          </Heading>
          <Link href="http://www.formidablelabs.com"><Image width="100%" src={images.logo}/></Link>
        </Slide>
      </Deck>
    )
  }
}