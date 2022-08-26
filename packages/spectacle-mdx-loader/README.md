spectacle-mdx-loader
====================

[![npm version][npm_img]][npm_site]
[![Travis Status][trav_img]][trav_site]
[![Maintenance Status][maintenance-image]](#maintenance-status)

An [MDX][] [webpack][] loader for [Spectacle][] presentation decks.

## Install

```sh
$ npm add --save-dev spectacle-mdx-loader
$ yarn add --dev spectacle-mdx-loader
```

## Usage

To use this loader in a Spectacle presenation you need to configure webpack and then add the surrounding MDX Spectacle helper code. See a [full example](./examples/mdx) for more details.

First, integrate into your `webpack.config.js` file:

```js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      // `.mdx` files go through babel and mdx transforming loader.
      {
        test: /\.mdx$/,
        use: ['babel-loader', 'spectacle-mdx-loader']
      }
    ]
  }
};
```

Then, write up your MDX file (e.g., `slides.mdx`) and wrap up a full Spectacle deck:

```js
import React from 'react';
import { render } from 'react-dom';
import { MDXProvider } from '@mdx-js/react';
import { Deck, Slide, Notes, mdxComponentMap } from 'spectacle';

import slides, { notes } from './slides.mdx';

const Deck = () => (
  <MDXProvider components={mdxComponentMap}>
    <Deck>
      {slides
        .map((MDXSlide, i) => [MDXSlide, notes[i]])
        .map(([MDXSlide, MDXNote], i) => (
          <Slide key={`slide-${i}`} slideNum={i}>
            <MDXSlide />
            <Notes>
              <MDXNote />
            </Notes>
          </Slide>
        ))}
    </Deck>
  </MDXProvider>
);

render(<Deck />, document.getElementById('root'));
```

[npm_img]: https://badge.fury.io/js/spectacle-mdx-loader.svg
[npm_site]: http://badge.fury.io/js/spectacle-mdx-loader
[trav_img]: https://api.travis-ci.com/FormidableLabs/spectacle-mdx-loader.svg
[trav_site]: https://travis-ci.com/FormidableLabs/spectacle-mdx-loader

[MDX]: https://mdxjs.com/
[webpack]: https://webpack.js.org/
[Spectacle]: https://formidable.com/open-source/spectacle/
[npx]: https://www.npmjs.com/package/npx
[maintenance-image]: https://img.shields.io/badge/maintenance-active-green.svg?color=brightgreen&style=flat

## Maintenance Status

**Active:** Formidable is actively working on this project, and we expect to continue for work for the foreseeable future. Bug reports, feature requests and pull requests are welcome.
