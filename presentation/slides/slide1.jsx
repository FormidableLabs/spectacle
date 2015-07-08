import React from 'react/addons';
import assign from 'object-assign';
import Radium from 'radium';
import {
  Slide, Heading, Link, Text
} from '../../src/spectacle';

@Radium
class Slide1 extends Slide {
  render() {
    return this.getRenderFor([
      <Heading size={1} fit caps textColor="black">
        Spectacle
      </Heading>,
      <Heading size={1} fit caps margin="-20px 0px">
        A ReactJS Presentation Library
      </Heading>,
      <Heading size={2} fit caps textColor="black">
        Where You Can Write Your Decks In JSX
      </Heading>,
      <Link href="https://github.com/FormidableLabs/spectacle"><Text bold caps textColor="tertiary">View on Github</Text></Link>,
      <Text textSize="1.5em" margin="20px 0px 0px" bold>Hit Your Right Arrow To Begin!</Text>
    ]);
  }
}

Slide1.defaultProps = assign({}, Slide.defaultProps, {
  transition: ['zoom'],
  bgColor: 'primary'
});

export default Slide1;
