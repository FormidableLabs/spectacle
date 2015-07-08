import React from 'react/addons';
import assign from 'object-assign';
import Radium from 'radium';
import {
  Slide, Heading, Link
} from '../../src/spectacle';
const images = {
  city: require('../city.jpg'),
  kat: require('../kat.png'),
  logo: require('../formidable-logo.svg')
};

@Radium
class Slide1 extends Slide {
  render() {
    return this.getRenderFor([
      <Heading size={1} caps fit textColor="primary">
        Made with love in Seattle by
      </Heading>,
      <Link href="http://www.formidablelabs.com"><Image width="100%" src={images.logo}/></Link>
    ]);
  }
}

Slide1.defaultProps = assign({}, Slide.defaultProps, {
  transition: ['spin', 'slide'],
  bgColor: 'tertiary'
});

export default Slide1;
