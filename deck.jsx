import React from 'react/addons';
import {
  Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
  Heading, Image, Layout, ListItem, List, S, Slide, Text
} from './src/spectacle';

import Interactive from './interactive';

export default class extends React.Component {
  render() {
    return (
      <Deck transition={['zoom','slide']} transitionDuration={800}>
        <Slide bgColor="primary">
          <Heading size={1} fit caps>
            React Presentations
          </Heading>
          <Heading size={2} fit caps textColor="black">
            Written In React
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="black">
          <Heading size={1} fit textColor="primary" textFont="secondary">
            What dafuq?
          </Heading>
        </Slide>
        <Slide transition={['zoom']} bgColor="primary" align="center middle">
          <CodePane
            lang="javascript"
            source={require("raw!./deck.example")}
            margin="20px auto"
            textSize="1em"/>
        </Slide>
        <Slide transition={['fade']} bgColor="black" textColor="primary" align="center top">
          <Heading size={1} textColor="primary" textFont="secondary">
            Thats right
          </Heading>
          <List>
            <ListItem><Appear>Inline style based theme system</Appear></ListItem>
            <ListItem><Appear>Autofit text</Appear></ListItem>
            <ListItem><Appear>Flexbox layout system</Appear></ListItem>
            <ListItem><Appear>React-Router navigation</Appear></ListItem>
            <ListItem><Appear>PDF export</Appear></ListItem>
            <ListItem><Appear>And...</Appear></ListItem>
          </List>
        </Slide>
        <Slide bgColor="primary">
          <Heading size={1} caps fit textColor="black">
            Your presentations are interactive
          </Heading>
          <Interactive/>
        </Slide>
      </Deck>
    )
  }
}