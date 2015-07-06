import React from 'react/addons';
import assign from 'object-assign';
import Radium from 'radium';
import {
  Slide, CodePane
} from '../../src/spectacle';

@Radium
class Slide3 extends Slide {
  render() {
    return this.getRenderFor([
      <CodePane
        lang="javascript"
        source={require("raw!../deck.example")}
        margin="20px auto"/>
    ]);
  }
}

Slide3.defaultProps = assign(Slide.defaultProps, {
  transition: ['zoom', 'fade'],
  bgColor: 'primary'
});

export default Slide3;
