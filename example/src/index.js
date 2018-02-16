import React from 'react';

import {
  Appear, BlockQuote, Cite, CodePane, ComponentPlayground, Deck, Fill,
  Heading, Image, Layout, Link, ListItem, List, Markdown, MarkdownSlides, Notes, 
  Quote, Slide, SlideSet, TableBody, TableHeader, TableHeaderItem, TableItem, 
  TableRow, Table, Text, GoToAction
} from '../../src';

import preloader from '../../src/utils/preloader';

import createTheme from '../../src/themes/default';

import Interactive from '../assets/interactive';

require('normalize.css');

const images = {
  city: require('../assets/city.jpg'),
  kat: require('../assets/kat.png'),
  logo: require('../assets/formidable-logo.svg'),
  markdown: require('../assets/markdown.png')
};

preloader(images);

const theme = createTheme({
  primary: '#ff4081'
});

export default class Presentation extends React.Component {
  state = {
    steps: 0
  }

  updateSteps = steps => {
    if (this.state.steps !== steps) { // eslint-disable-line no-invalid-this
      this.setState({ steps }); // eslint-disable-line no-invalid-this
    }
  }

  render() {
    return (
      <Deck transition={['zoom', 'slide']} theme={theme} transitionDuration={500}>
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="black">
            Spectacle
          </Heading>
          <Heading size={1} fit caps>
            A ReactJS Presentation Library
          </Heading>
          <Heading size={1} fit caps textColor="black">
            Where You Can Write Your Decks In JSX
          </Heading>
          <Link href="https://github.com/FormidableLabs/spectacle">
            <Text bold caps textColor="tertiary">View on Github</Text>
          </Link>
          <Notes>This is slide numero uno! Aenean leo ligula, porttitor eu, pibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. </Notes>
          <Text textSize="1.5em" margin="20px 0px 0px" bold>Hit Your Right Arrow To Begin!</Text>
        </Slide>
        <Slide
          onActive={slideIndex => {
            console.info(`Viewing slide index: ${slideIndex}.`); // eslint-disable-line no-console
          }}
          id="wait-what"
          goTo={4}
          transition={[
            'fade',
            (transitioning, forward) => {
              const angle = forward ? -180 : 180;
              return {
                transform: `
                  translate3d(0%, ${transitioning ? 100 : 0}%, 0)
                  rotate(${transitioning ? angle : 0}deg)
                `,
                backgroundColor: transitioning ? '#26afff' : '#000'
              };
            }
          ]}
          bgColor="black"
        >
          <Notes>&& here is Number Two. You can even put notes on your slide. How awesome is that?</Notes>
          <Image src={images.kat.replace('/', '')} margin="0px auto 40px" />
          <Heading size={2} caps fit textColor="primary" textFont="primary">
            Wait what?
          </Heading>
        </Slide>
        <Slide
          transitionIn={['zoom', 'fade']}
          transitionOut={['slide', 'fade']}
          bgColor="primary"
        >
          <Notes><ul><li>Number THREE</li><li>talk about that</li><li>and that</li></ul></Notes>
          <CodePane
            lang="jsx"
            source={require('raw-loader!../assets/deck.example')}
            margin="20px auto"
            overflow = "overflow"
          />
        </Slide>
        <Slide goTo={3}>
          <ComponentPlayground
            theme="dark"
          />
          <Notes>Aenean 4 leo ligula, nuuuuuuumber four porttitor eu, 4 consequat vitae, 4 eleifend ac, enim. Aliquam lorem 4 ante, dapibus in, 4 viverra quis, feugiat a, 4 tellus. Phasellus viverra imperdiet. Etiam 4 ultricies nisi vel 4 augue. Curabitur ullamcorper 4 ultricies 4 nisi. Nam eget dui. Etiam rhoncus. sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. </Notes>
        </Slide>
        <Slide transition={['slide']} bgImage={images.city.replace('/', '')} bgDarken={0.75}>
          <Appear fid="1">
            <Heading size={1} caps fit textColor="primary">
              Full Width
            </Heading>
          </Appear>
          <Notes>Da fif etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. </Notes>
          <Appear fid="2">
            <Heading size={1} caps fit textColor="tertiary">
              Adjustable Darkness
            </Heading>
          </Appear>
          <Appear fid="3">
            <Heading size={1} caps fit textColor="primary">
              Background Imagery
            </Heading>
          </Appear>
        </Slide>
        <Slide>
          <Heading size={2} textColor="secondary" margin="0.25em">
           Mix it up!
          </Heading>
          <Heading size={6} textColor="tertiary">
            You can even jump to different slides with a standard button or custom component!
          </Heading>
          <Notes>Siiiiiiiix Aenean leo ligula, porttitor eu, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam, lorem. </Notes>
          <GoToAction
            margin="1em"
            slide={8}
          >
            Jump to Slide 8
          </GoToAction>
          <GoToAction
            render={goToSlide => (
              <select
                defaultValue=""
                style={{
                  background: '#000',
                  color: '#fff',
                  fontFamily: theme.print.fonts.primary,
                  fontSize: '1.1em'
                }}
                onChange={({ target }) => goToSlide(target.value)}
              >
                <option value="" disabled>Custom Slide Picker</option>
                <option value="wait-what">Wait What!? Slide</option>
                <option value={3}>Slide 3</option>
              </select>
            )}
          />
        </Slide>
        <Slide transition={['slide']} bgColor="black">
          <BlockQuote>
            <Quote>Wonderfully formatted quotes</Quote>
            <Cite>Ken Wheeler</Cite>
          </BlockQuote>
          <Notes>SEVEN! Etiam ultricies nisi vel augue. 7 Curabitur ullamcorper ultricies nisi. 7 Nam eget dui. 7 Etiam rhoncus. 7 Maecenas tempus, tellus eget condimentum rhoncus, 7 sem quam semper libero, sit amet adipiscing 7 sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. </Notes>
        </Slide>
        <Slide transition={['spin', 'slide']} bgColor="tertiary">
          <Heading size={1} caps fit lineHeight={1.5} textColor="primary">
            Made with love in Seattle by
          </Heading>
          <Notes>Aenean leo ligula, 8 porttitor eu, 8 Quisque rutrum. Aenean imperdiet. Etiam 8 ultricies nisi vel augue. Curabitur 8 ullamcorper ultricies nisi. 8 Nam eget dui. Etiam rhoncus. Maecenas tempus, 8 tellus eget condimentum rhoncus, sem quam semper libero, 8 sit amet adipiscing sem neque sed ipsum. 8 Nam quam nunc, blandit 8 vel, luctus 8 pulvinar, hendrerit id, lorem. </Notes>
          <Link href="http://www.formidable.com"><Image width="100%" src={images.logo}/></Link>
        </Slide>
      </Deck>
    );
  }
}
