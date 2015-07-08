import React from 'react/addons';
import {
  Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
  Heading, Image, Layout, Link, ListItem, List, Quote, S, Slide, Text
} from '../src/spectacle';
import preloader from '../src/utils/preloader';

import slides from './slides/'

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
        {slides}
      </Deck>
    )
  }
}
