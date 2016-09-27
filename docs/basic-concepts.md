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
  Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
  Heading, Image, Layout, ListItem, List, Quote, Spectacle, Slide, Text
} from 'spectacle';

export default class extends Component {
  render() {
    return (
      <Spectacle>
        <Deck>
          <Slide>
            <Text>Hello</Text>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}

```

Here is where you can use the library's tags to compose your presentation. While you can use any JSX syntax here, building your presentation with the supplied tags allows for theming to work properly.

The bare minimum you need to start is a `Spectacle` element, a`Deck` element and a `Slide` element. Each `Slide` element represents a slide inside of your slideshow.

<a name="themes"></a>
## Themes

In Spectacle, themes are functions that return style objects for `screen` & `print`.

You can import the default theme from:

```jsx
import createTheme from "spectacle/lib/themes/default";
```

Or create your own based upon the source.

`index.js` is what you would edit in order to create a custom theme of your own, using ReactJS style inline style objects.

You will want to edit `index.html` to include any web fonts or additional CSS that your theme requires.

<a name="createthemecolors-fonts"></a>
### createTheme(colors, fonts)

Spectacle's functional theme system allows you to pass in color and font variables that you can use on your elements. See the example below:

```jsx
const theme = createTheme({
  primary: "red"
}, {
  primary: "Helvetica"
});
```

The returned theme object can then be passed to the `Spectacle` tag via the `theme` prop, and will override the default styles.