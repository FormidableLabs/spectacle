import React from 'react/addons';
import {
  Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
  Heading, Image, Layout, Link, ListItem, List, Quote, S, Slide, Text
} from '../src/spectacle';
import preloader from '../src/utils/preloader';

import Slide1 from './slides/slide1.jsx';
import Slide2 from './slides/slide2.jsx';
import Slide3 from './slides/slide3.jsx';
import Slide4 from './slides/slide4.jsx';
import Slide5 from './slides/slide5.jsx';
import Slide6 from './slides/slide6.jsx';
import Slide7 from './slides/slide7.jsx';
import Slide8 from './slides/slide8.jsx';
import Slide9 from './slides/slide9.jsx';
import Slide10 from './slides/slide10.jsx';

const images = {
  city: require('./city.jpg'),
  kat: require('./kat.png'),
  logo: require('./formidable-logo.svg')
};

preloader([images.city, images.kat]);

export default class extends React.Component {
  render() {
    return (
      <Deck transitionDuration={800}>
        <Slide1 />
        <Slide2 />
        <Slide3 />
        <Slide4 />
        <Slide5 />
        <Slide6 />
        <Slide7 />
        <Slide8 />
        <Slide9 />
        <Slide10 />
      </Deck>
    )
  }
}
