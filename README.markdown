#Spectacle
ReactJS based Presentation Library

##Getting Started

Your first order of business is to open terminal and run `npm install`

Then, to start up the local server, run `npm start`

Open a browser and hit `http://localhost:3000`, and we are ready to roll

## Build & Deploy

Building the dist version of the project is as easy as running `npm run build`

If you want to deploy the slideshow to surge, run `npm run deploy`

## Presenting

Spectacle comes with a built in presenter mode. It shows you a slide lookahead, current time and your current slide:

![http://i.imgur.com/csPXbjM.png](http://i.imgur.com/csPXbjM.png)

To present:

- Run `npm start`
- Open two browser windows on two different screens
- On your screen visit [http://localhost:3000/#/?presenter](http://localhost:3000/#/)
- On the presentation screen visit [http://localhost:3000/#/](http://localhost:3000/#/)
- Give an amazingly stylish presentation

_Note: Any windows/tabs in the same browser that are running Spectacle will sync to one another, even if you don't want to use presentation mode_

Check it out:

![http://i.imgur.com/H7o2qHI.gif](http://i.imgur.com/H7o2qHI.gif_)

You can toggle the presenter or overview mode by pressing respectively `p` and `o`.

## PDF Export

Exporting a totally sweet looking PDF from your totally sweet looking Spectacle presentation is asburdly easy.

- Run `npm start`
- Hit [http://localhost:3000/#/?export](http://localhost:3000/#/?export)
- Bring up the print dialog `(ctrl or cmd + p)`
- Check "Background Graphics" to on if you are about that life
- Change destination to "Save as PDF", as shown below:

![http://i.imgur.com/t6GL5Oc.png](http://i.imgur.com/t6GL5Oc.png)

If you want to print your slides, and want a printer friendly version, simply repeat the above process but instead print from [http://localhost:3000/#/?export&print](http://localhost:3000/#/?export&print)

## Basic Concepts

### Main file

Your presentation files & assets will live in the `presentation` folder.

The main `.jsx` file you write your deck in is `/presentation/deck.jsx`

```javascript
// deck.jsx

import React from 'react/addons';
import {
  Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
  Heading, Image, Layout, ListItem, List, Quote, S, Slide, Text
} from '../src/spectacle';

export default class extends React.Component {
  render() {
    return (
      <Deck>
        <Slide>
          <Text>Hello</Text>
        </Slide>
      </Deck>
    )
  }
}

```

Here is where you can use the library's tags to compose your presentation. While you can use any JSX syntax here, building your presentation with the supplied tags allows for theming to work properly.

The bare minimum you need to start is a `Deck` element and a `Slide` element. Each `Slide` element represents a slide inside of your slideshow.

### Themes

In Spectacle, themes live in the `themes` directory. They consist of `html.js` and `index.js`.

`index.js` is what you would edit in order to create a custom theme of your own, using ReactJS style inline style objects.

```javascript
var colors = {  // <--- Color variables used in the presentation
  primary: '#f9c300',
  secondary: 'black',
  tertiary: 'white'
};

var fonts = { // <--- Font variables used in the presentation
  primary: 'Open Sans Condensed',
  secondary: 'Lobster Two',
  tertiary: 'monospace'
}

module.exports = {
  colors: colors,
  fonts: fonts,
  global: { // <--- Global styles added to a <style> tag in the body
    body: {
      background: colors.primary,
      fontFamily: fonts.primary,
      fontWeight: 'normal',
      fontSize: '2em',
      color: colors.secondary
    }
  },
  components: { // <--- Component specific style declarations
    blockquote: {
      textAlign: 'left',
      position: 'relative',
      display: 'inline-block'
    },
    ...
}
```

`html.js` is where you can define the HTML page that your presentation is rendered into. This allows you do to things like add stylesheets, libraries or webfonts for use in themes.

```javascript
module.exports = function(data) {
  return {
    '200.html': data.defaultTemplate(),
    'index.html': [
      '<!doctype html>',
        '<html>',
          '<head>',
            '<meta charset="utf-8"/>',
            '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>',
            '<link href="http://fonts.googleapis.com/css?family=Lobster+Two:400,700" rel="stylesheet" type="text/css">',
            '<link href="http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700" rel="stylesheet" type="text/css">',
            '<link href="' + data.css + '" rel="stylesheet" type="text/css" />', // <-- Don't remove this
          '</head>',
          '<body>',
            '<div id="root"></div>', // <-- or this
            '<script src="' + data.main + '"></script>', // <-- or this
          '</body>',
        '</html>'
    ].join('')
  }
}

```

###Configuration

Presentation configuration live in `/presentation/config.js`. You can edit global configs here:

```javascript
module.exports = {
  width: 1000, // <-- Max width of presentation area
  margin: 40, // <-- Presentation area side padding
  theme: require('../themes/default/index'), // <- Theme Styles
  html: require('../themes/default/html') // <- Theme HTML
}
```

## Tag API

In Spectacle, presentations are composed of a set of base tags. We can separate these into three categories: Main tags, Layout tags & Element tags.

### Main Tags

####\<Deck />

The deck tag is the top level tag and there should only be one of them. It supports the following props:

|Name|PropType|Description|
|---|---|---|
|transition|React.PropTypes.array|Accepts `slide`, `zoom`, `fade` or `spin`, and can be combined. Sets global slide transitions. **Note: If you use the 'scale' transition, fitted text won't work in Safari.**|
|transitionDuration| React.PropTypes.number| Accepts integer value in milliseconds for global transition duration.
|progress| React.PropTypes.string|Accepts `pacman`, `bar`, `number` or `none`.

####\<Slide /> (Base)

The slide tag represents each slide in the presentation. It supports the following props, in addition to any of the props outlined in the Base class props listing:

|Name|PropType|Description|
|---|---|---|
|align| React.PropTypes.string | Accepts a space delimited value for positioning interior content. The first value can be `flex-start` (left), `center` (middle), or `flex-end` (bottom). The second value can be `flex-start` (top) , `center` (middle), or `flex-end` (bottom). You would provide this prop like `align="center middle"`, which is it's default.
|transition|React.PropTypes.array|Accepts `slide`, `zoom`, `fade` or `spin`, and can be combined. Sets the slide transition. **Note: If you use the 'scale' transition, fitted text won't work in Safari.**|
|transitionDuration| React.PropTypes.number| Accepts integer value in milliseconds for slide transition duration.
|notes| React.PropTypes.stings| Text which will appear in the presenter mode. Can be HTML.

###Layout Tags

Layout tags are used for layout using Flexbox within your slide. They are `Layout`, `Fit` & `Fill`.

####\<Layout />

The layout tag is used to wrap `Fit` and `Fill` tags to provide a row.

####\<Fit />

The fit tag only takes up as much space as its bounds provide.

####\<Fill />

The fill tag takes up all the space available to it. For example, if you have a `Fill` tag next to a `Fit` tag, the `Fill` tag will take up the rest of the space. Adjacent `Fill` tags split the difference and form an equidistant grid.

### Element Tags

The element tags are the bread and butter of your slide content. Most of these tags derive their props from the Base class, but the ones that have special options will have them listed:

####\<Appear />

This tag does not extend from Base. It's special. Wrapping elements in the appear tag makes them appear/disappear in order in response to navigation.

####\<BlockQuote />, \<Quote/> and \<Cite /> (Base)

These tags create a styled blockquote. Use them as follows:

```javascript
<BlockQuote>
	<Quote>Ken Wheeler is amazing</Quote>
	<Cite>Everyone</Cite>
</BlockQuote>
```

####\<CodePane />

This tag displays a styled, highlighted code preview. I prefer putting my code samples in external `.example` files and requiring them using `raw-loader` as shown in the demo. Here are the props:

|Name|PropType|Description|
|---|---|---|
|lang|React.PropTypes.string| Highlight.js compatible language name. i.e: 'javascript' |
|source| React.PropTypes.string| String of code to be shown |

####\<Code />

A simple tag for wrapping inline text that you want lightly styled in a monospace font.

####\<Heading /> (Base)

Heading tags are special in that, when you specify a `size` prop, they generate the appropriate heading tag, and extend themselves with a style that is defined in the theme file for that heading.

|Name|PropType|Description|
|---|---|---|
|fit|React.PropTypes.boolean| When set to true, fits text to the slide's width. **Note: If you use the 'scale' transition, this won't work in Safari.** |

####\<Image /> (Base)

|Name|PropType|Description|
|---|---|---|
|display|React.PropTypes.string| Set the display style property of the image |
|height|React.PropTypes.string or React.PropTypes.number| Supply a height to the image |
|src|React.PropTypes.string| Image src |
|width|React.PropTypes.string or React.PropTypes.number| Supply a width to the image |

####\<Link /> (Base)

The link tag is used to render `<a>` tags. It accepts an `href` prop:

|Name|PropType|Description|
|---|---|---|
|href|React.PropTypes.string| String of url for `href` attribute |

####\<List /> & \<ListItem /> (Base)

These tags create lists. Use them as follows:

```javascript
<List>
	<ListItem>Item 1</ListItem>
	<ListItem>Item 2</ListItem>
	<ListItem>Item 3</ListItem>
	<ListItem>Item 4</ListItem>
</List>
```

####\<S />

The `S` tag is used to add inline styling to a piece of text, such as underline or strikethrough.

|Name|PropType|Description|
|---|---|---|
|type|React.PropTypes.string| Accepts `strikethrough`, `underline`, `bold` or `italic`|

####\<Text/> (Base)

The `Text` tag is used to add text to your slide.

|Name|PropType|Description|
|---|---|---|
|fit|React.PropTypes.boolean| When set to true, fits text to the slide's width. **Note: If you use the 'scale' transition, this won't work in Safari.** |

### Base Props

Every component above that has `(Base)` after it has been extended from a common class that includes the following props:

| Name | PropType | Description |
| ---- | -------- | ----------- |
| italic | React.PropTypes.boolean | Set `fontStyle` to `italic` |
| bold | React.PropTypes.boolean | Set `fontWeight` to `bold ` |
| caps | React.PropTypes.boolean | Set `textTransform` to `uppercase ` |
| margin | React.PropTypes.number or string | Set `margin` value|
| padding | React.PropTypes.number or string | Set `padding` value|
| textColor | React.PropTypes.string | Set `color` value|
| textSize | React.PropTypes.string | Set `fontSize` value|
| textAlign | React.PropTypes.string | Set `textAlign` value|
| bgColor | React.PropTypes.string | Set `backgroundColor` value|
| bgImage | React.PropTypes.string | Set `backgroundImage` value|
| bgDarken | React.PropTypes.number | Float value from 0.0 to 1.0 specifying how much to darken the bgImage image|
