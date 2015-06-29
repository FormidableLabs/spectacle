import React from 'react/addons';
import {
  BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
  Heading, Image, Layout, ListItem, List, S, Slide, Text
} from './src/spectacle';

export default class extends React.Component {
  render() {
    return (
      <Deck
        autoplay={false}
        autoplaySpeed={2000}
        progress={true}
        transition="slide"
        transitionSpeed={300}>
        <Slide
          hAlign="center"
          vAlign="center"
          transition="fade"
          transitionSpeed={300}>
          <Heading size={1}>Slide 1</Heading>
        </Slide>
        <Slide backgroundImg="./bg.png" backgroundExposure={-5}>
          <Heading size={1} fit>Fit Me</Heading>
          <Layout>
            <Fill>
              <CodePane>
                {"<a href='code></a>'"}
              </CodePane>
              Left Side
            </Fill>
            <Fill>
              Right Side
            </Fill>
          </Layout>
        </Slide>
        <Slide>
          <Heading size={1}>Slide 3</Heading>
        </Slide>
      </Deck>
    )
  }
}