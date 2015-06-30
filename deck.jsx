import React from 'react/addons';
import {
  Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
  Heading, Image, Layout, ListItem, List, S, Slide, Text
} from './src/spectacle';

export default class extends React.Component {
  render() {
    return (
      <Deck transition={['zoom','slide']} transitionDuration={800}>
        <Slide bgColor="primary">
          <Heading size={1} fit caps>
            Getting Started With
          </Heading>
          <Heading size={2} fit caps>
            Flux Architecture
          </Heading>
          <Heading size={5}>
            @ken_wheeler
          </Heading>
        </Slide>
        <Slide bgColor="black">
          <Heading size={1} fit textColor="primary" textFont="secondary">
            What Is Flux?
          </Heading>
        </Slide>
        <Slide bgColor="primary" textColor="black" align="center top">
          <Heading size={1} textColor="black" textFont="primary">
            Flux Architecture
          </Heading>
          <List>
            <ListItem>It fits onto the page!</ListItem>
            <ListItem>Lists work pretty well. Its incredible.</ListItem>
            <ListItem>I hate typing demo typography copy.</ListItem>
          </List>
        </Slide>
        <Slide bgColor="primary" align="center top">
          <Heading size={2} textColor="black" textFont="primary">
            Actions
          </Heading>
          <CodePane
            lang="javascript"
            source={require("raw!./actions.example")}
            margin="20px auto"/>
        </Slide>
      </Deck>
    )
  }
}