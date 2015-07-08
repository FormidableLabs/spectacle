import React from 'react/addons';
import assign from 'object-assign';
import Radium from 'radium';
import {
  Slide, BlockQuote, Quote, Cite
} from '../../src/spectacle';

@Radium
class Slide6 extends Slide {
  render() {
    return this.getRenderFor([
      <BlockQuote>
        <Quote>Wonderfully formatted quotes</Quote>
        <Cite>Ken Wheeler</Cite>
      </BlockQuote>
    ]);
  }
}

Slide6.defaultProps = assign({}, Slide.defaultProps, {
  transition: ['slide'],
  bgColor: 'black'
});

export default Slide6;
