import React from 'react/addons';
import assign from 'object-assign';
import Radium from 'radium';
import {
  Slide, Heading, Layout, Fill
} from '../../src/spectacle';

@Radium
class Slide5 extends Slide {
  render() {
    return this.getRenderFor([
      <Heading caps fit>Flexible Layouts</Heading>,
      <Layout>
        <Fill>
          <Heading size={4} caps textColor="secondary" bgColor="white" margin={10}>
            Left
          </Heading>
        </Fill>
        <Fill>
          <Heading size={4} caps textColor="secondary" bgColor="white" margin={10}>
            Right
          </Heading>
        </Fill>
      </Layout>
    ]);
  }
}

Slide5.defaultProps = assign(Slide.defaultProps, {
  transition: ['zoom', 'fade'],
  bgColor: 'primary'
});

export default Slide5;
