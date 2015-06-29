import React from 'react/addons';
import {
  Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
  Heading, Image, Layout, ListItem, List, S, Slide, Text
} from './src/spectacle';

export default class extends React.Component {
  render() {
    return (
      <Deck transition={['zoom']} transitionDuration={800}>
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
        <Slide bgColor="secondary" textColor="tertiary" align="center top">
          <Heading size={1} fit textColor="tertiary" textFont="primary">
            Fitted Text Works Great
          </Heading>
          <Layout>
            <Fill>
              <CodePane>
                {"<a href='code'></a>"}
              </CodePane>
              Left Side
            </Fill>
            <Fill>
              Right Side
            </Fill>
          </Layout>
        </Slide>
        <Slide bgColor="primary">
          <Heading size={1} textFont="primary">
            Slide 3
          </Heading>
        </Slide>
      </Deck>
    )
  }
}