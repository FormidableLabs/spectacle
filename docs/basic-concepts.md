<a name="basic-concepts"></a>

# Basic Concepts

<a name="main-file"></a>

## Main file

Your presentation files & assets will live in the `presentation` folder.

The main `.js` file you write your deck in is `/presentation/index.js`

Check it out [here](https://github.com/FormidableLabs/spectacle-boilerplate/blob/master/presentation/index.js) in the boilerplate.

```jsx
// index.js

import React, { Component } from 'react';
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Code,
  Deck,
  Fill,
  Fit,
  Heading,
  Image,
  Layout,
  ListItem,
  List,
  Quote,
  Slide,
  Text
} from 'spectacle';

export default class extends Component {
  render() {
    return (
      <Deck>
        <Slide>
          <Text>Hello</Text>
        </Slide>
      </Deck>
    );
  }
}
```

Here is where you can use the library's tags to compose your presentation. While you can use any JSX syntax here, building your presentation with the supplied tags allows for theming to work properly.

The bare minimum you need to start is a `Deck` element and a `Slide` element. Each `Slide` element represents a slide inside of your slideshow.

<a name="themes"></a>

## Themes

In Spectacle, themes are functions that return style objects for `screen` & `print`.

You can import the default theme from:

```jsx
import createTheme from 'spectacle/lib/themes/default';
```

Or create your own based upon the source.

`index.js` is what you would edit in order to create a custom theme of your own, using object based styles.

You will want to edit `index.html` to include any web fonts or additional CSS that your theme requires.

<a name="createthemecolors-fonts"></a>

### createTheme(colors, fonts)

Spectacle's functional theme system allows you to pass in color and font variables that you can use on your elements. The fonts configuration object can take a string for a system font or an object that specifies it‘s a Google Font. If you use a Google Font you can provide a styles array for loading different weights and variations. Google Font tags will be automatically created. See the example below:

```jsx
const theme = createTheme(
  {
    primary: 'red',
    secondary: 'blue'
  },
  {
    primary: 'Helvetica',
    secondary: {
      name: 'Droid Serif',
      googleFont: true,
      styles: ['400', '700i']
    }
  }
);
```

The returned theme object can then be passed to the `Deck` tag via the `theme` prop, and will override the default styles.

<a name="faq"></a>

## FAQ

**_How can I easily style the base components for my presentation?_**

Historically, custom styling in Spectacle has meant screwing with a theme file, or using `!important` overrides. We fixed that. Spectacle is now driven by [emotion](https://github.com/emotion-js/emotion), so you can bring your own styling library, whether it's emotion itself, or something like styled-components or glamorous. For example, if you want to create a custom Heading style:

```javascript
import styled from 'react-emotion';
import { Heading } from 'spectacle';

const CustomHeading = styled(Heading)`
  font-size: 1.2em;
  color: papayawhip;
`;
```

<a name="tag-api"></a>

**_Can I write my presentation in TypeScript?_**

Yes, you can! Type definitions are shipped with the library, so you can import Spectacle components into any `.tsx` presentation without additional installation steps.

Updated type definitions for the Spectacle API can be found [at the root of this repository](./index.d.ts).
