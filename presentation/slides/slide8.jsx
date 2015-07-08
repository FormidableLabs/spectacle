import React from 'react/addons';
import assign from 'object-assign';
import Radium from 'radium';
import {
  Slide, List, ListItem, Appear
} from '../../src/spectacle';

@Radium
class Slide1 extends Slide {
  render() {
    return this.getRenderFor([
      <List>
        <ListItem><Appear>Inline style based theme system</Appear></ListItem>
        <ListItem><Appear>Autofit text</Appear></ListItem>
        <ListItem><Appear>Flexbox layout system</Appear></ListItem>
        <ListItem><Appear>React-Router navigation</Appear></ListItem>
        <ListItem><Appear>PDF export</Appear></ListItem>
        <ListItem><Appear>And...</Appear></ListItem>
      </List>
    ]);
  }
}

Slide1.defaultProps = assign({}, Slide.defaultProps, {
  transition: ['fade'],
  bgColor: 'secondary',
  textColor: 'primary'
});

export default Slide1;
