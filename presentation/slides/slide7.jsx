import React from 'react/addons';
import assign from 'object-assign';
import Radium from 'radium';
import {
  Slide, Heading
} from '../../src/spectacle';

@Radium
class Slide1 extends Slide {
  render() {
    return this.getRenderFor([
      <Heading caps fit size={1} textColor="tertiary">
        Smooth
      </Heading>,
      <Heading caps fit size={1} textColor="secondary">
        Combinable Transitions
      </Heading>
    ]);
  }
}

Slide1.defaultProps = assign({}, Slide.defaultProps, {
  transition: ['slide', 'spin'],
  bgColor: 'primary'
});

export default Slide1;
