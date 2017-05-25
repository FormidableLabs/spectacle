# Spectacle

[![Join the chat at https://gitter.im/FormidableLabs/spectacle](https://badges.gitter.im/FormidableLabs/spectacle.svg)](https://gitter.im/FormidableLabs/spectacle?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
ReactJS based Presentation Library

[Spectacle Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate/)

## Contents

<!-- MarkdownTOC depth=4 autolink=true bracket=round autoanchor=true -->

- [Getting Started](#getting-started)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Presenting](#presenting)
- [Controls](#controls)
- [Fullscreen](#fullscreen)
- [PDF Export](#pdf-export)
- [Basic Concepts](#basic-concepts)
  - [Main file](#main-file)
  - [Themes](#themes)
    - [createTheme(colors, fonts)](#createthemecolors-fonts)
- [Tag API](#tag-api)
  - [Main Tags](#main-tags)
    - [Deck](#deck)
    - [Slide (Base)](#slide-base)
    - [MarkdownSlides](#markdown-slides)
  - [Layout Tags](#layout-tags)
    - [Layout](#layout)
    - [Fit](#fit)
    - [Fill](#fill)
  - [Markdown Tag](#markdown-tag)
    - [Markdown](#markdown)
  - [Element Tags](#element-tags)
    - [Appear](#appear)
    - [BlockQuote, Quote and Cite (Base)](#blockquote-quote-and-cite-base)
    - [CodePane (Base)](#codepane-base)
    - [Code (Base)](#code-base)
    - [ComponentPlayground](#component-playground)
    - [Heading (Base)](#heading-base)
    - [Image (Base)](#image-base)
    - [Link (Base)](#link-base)
    - [List & ListItem (Base)](#list--listitem-base)
    - [S (Base)](#s-base)
    - [Table, TableRow, TableBody, TableHeader, TableHeaderItem and TableItem (Base)](#table-tablerow-tableheaderitem-and-tableitem-base)
    - [Text (Base)](#text-base)
    - [Typeface](#typeface)
  - [Base Props](#base-props)
- [Third Party Extensions](#third-party)

<!-- /MarkdownTOC -->


<a name="getting-started"></a>
## Getting Started

The best way to get started is by using the [Spectacle Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate).

Alternatively, you can `npm install spectacle` and write your own build configurations.

But really, it is SO much easier to just use the boilerplate. Trust me.

<a name="development"></a>
## Development

After downloading the boilerplate, your first order of business is to open terminal and run `npm install`

Next run `rm -R .git` to remove the existing version control.

Then, to start up the local server, run `npm start`

Open a browser and hit [http://localhost:3000](http://localhost:3000), and we are ready to roll

<a name="build--deployment"></a>
## Build & Deployment

Building the dist version of the project is as easy as running `npm run build`

If you want to deploy the slideshow to surge, run `npm run deploy`

<a name="presenting"></a>
## Presenting

Spectacle comes with a built in presenter mode. It shows you a slide lookahead, current time and your current slide:

![http://i.imgur.com/jW8uMYY.png](http://i.imgur.com/jW8uMYY.png)

Otherwise, it can also show you a stopwatch to count the elapsed time:

![http://i.imgur.com/VDltgmZ.png](http://i.imgur.com/VDltgmZ.png)

To present:

- Run `npm start`
- Open two browser windows on two different screens
- On your screen visit [http://localhost:3000/](http://localhost:3000/). You will be redirected to a URL containing the slide id.
- Add `presenter&` or `presenter&timer` immediately after the questionmark, e.g.: [http://localhost:3000/#/0?presenter](http://localhost:3000/#/0?presenter) or [http://localhost:3000/#/0?presenter&timer](http://localhost:3000/#/?presenter&timer&_k=wbyhif)
- On the presentation screen visit [http://localhost:3000/](http://localhost:3000/)
- Give an amazingly stylish presentation

_Note: Any windows/tabs in the same browser that are running Spectacle will sync to one another, even if you don't want to use presentation mode_

Check it out:

![http://i.imgur.com/H7o2qHI.gif](http://i.imgur.com/H7o2qHI.gif_)

You can toggle the presenter or overview mode by pressing respectively `alt+p` and `alt+o`.

<a name="controls"></a>
## Controls

|Key Combination|Function|
|---|---|
|Right Arrow|Next Slide|
|Left Arrow|Previous Slide|
|Space|Next Slide|
|Shift+Space|Previous Slide|
|Alt/Option + O|Toggle Overview Mode|
|Alt/Option + P|Toggle Presenter Mode|
|Alt/Option + T|Toggle Timer in Presenter Mode|

<a name="fullscreen"></a>
## Fullscreen

Fullscreen can be toggled via browser options, or by **hovering over the bottom right corner of your window until the fullscreen icon appears and clicking it**.

<a name="pdf-export"></a>
## PDF Export

Exporting a totally sweet looking PDF from your totally sweet looking Spectacle presentation is absurdly easy.

- Run `npm start`
- Open [http://localhost:3000/](http://localhost:3000/)
- Add `export&` after the `?` on the URL of page you are redirected to, e.g.: [http://localhost:3000/#/?export&_k=wbyhif](http://localhost:3000/#/?export&_k=wbyhif)
- Bring up the print dialog `(ctrl or cmd + p)`
- Check "Background Graphics" to on if you are about that life
- Change destination to "Save as PDF", as shown below:

![http://i.imgur.com/t6GL5Oc.png](http://i.imgur.com/t6GL5Oc.png)

If you want to print your slides, and want a printer friendly version, simply repeat the above process but instead print from [http://localhost:3000/?export&print](http://localhost:3000/?export&print)

<a name="basic-concepts"></a>
## Basic Concepts

<a name="main-file"></a>
### Main file

Your presentation files & assets will live in the `presentation` folder.

The main `.js` file you write your deck in is `/presentation/index.js`

Check it out [here](https://github.com/FormidableLabs/spectacle-boilerplate/blob/master/presentation/index.js) in the boilerplate.

```jsx
// index.js

import React, { Component } from 'react';
import {
  Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
  Heading, Image, Layout, ListItem, List, Quote, Slide, Text
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

The bare minimum you need to start is a`Deck` element and a `Slide` element. Each `Slide` element represents a slide inside of your slideshow.

<a name="themes"></a>
### Themes

In Spectacle, themes are functions that return style objects for `screen` & `print`.

You can import the default theme from:

```jsx
import createTheme from "spectacle/lib/themes/default";
```

Or create your own based upon the source.

`index.js` is what you would edit in order to create a custom theme of your own, using ReactJS style inline style objects.

You will want to edit `index.html` to include any web fonts or additional CSS that your theme requires.

<a name="createthemecolors-fonts"></a>
#### createTheme(colors, fonts)

Spectacle's functional theme system allows you to pass in color and font variables that you can use on your elements. The fonts configuration object can take a string for a system font or an object that specifies it‘s a Google Font. If you use a Google Font you can provide a styles array for loading different weights and variations. Google Font tags will be automatically created. See the example below:

```jsx
const theme = createTheme({
  primary: "red",
  secondary: "blue"
}, {
  primary: "Helvetica",
  secondary: { name: "Droid Serif", googleFont: true, styles: [ "400", "700i" ] }
});
```

The returned theme object can then be passed to the `Deck` tag via the `theme` prop, and will override the default styles.

<a name="tag-api"></a>
## Tag API

In Spectacle, presentations are composed of a set of base tags. We can separate these into three categories: Main tags, Layout tags & Element tags.

<a name="main-tags"></a>
### Main Tags

<a name="deck"></a>
#### Deck

The Deck tag is the root level tag for your presentation. It supports the following props:

|Name|PropType|Description|
|---|---|---|
|controls| PropTypes.bool| Show control arrows when not in fullscreen
|history|PropTypes.object|Accepts custom configuration for [history](https://github.com/ReactTraining/history)
|progress| PropTypes.string|Accepts `pacman`, `bar`, `number` or `none`.
|theme|PropTypes.object|Accepts a theme object for styling your presentation|
|transition|PropTypes.array|Accepts `slide`, `zoom`, `fade` or `spin`, and can be combined. Sets global slide transitions. **Note: If you use the 'scale' transition, fitted text won't work in Safari.**|
|transitionDuration| PropTypes.number| Accepts integer value in milliseconds for global transition duration.

<a name="slide-base"></a>
#### Slide (Base)

The slide tag represents each slide in the presentation. Giving a slide tag an `id` attribute will replace its number based navigation hash with the `id` provided. It supports the following props, in addition to any of the props outlined in the Base class props listing:

|Name|PropType|Description|
|---|---|---|
|align| PropTypes.string | Accepts a space delimited value for positioning interior content. The first value can be `flex-start` (left), `center` (middle), or `flex-end` (right). The second value can be `flex-start` (top) , `center` (middle), or `flex-end` (bottom). You would provide this prop like `align="center center"`, which is its default.
|id| PropTypes.string | Used to create a string based hash.
|maxHeight| PropTypes.number | Used to set max dimensions of the Slide.
|maxWidth| PropTypes.number | Used to set max dimentions of the Slide.
|notes| PropTypes.string| Text which will appear in the presenter mode. Can be HTML.
|transition|PropTypes.array|Accepts `slide`, `zoom`, `fade` or `spin`, and can be combined. Sets the slide transition. **Note: If you use the 'scale' transition, fitted text won't work in Safari.**|
|transitionDuration| PropTypes.number| Accepts integer value in milliseconds for slide transition duration.

<a name="markdown-slides"></a>
### MarkdownSlides

The MarkdownSlides function lets you create a single or multiple slides using Markdown. It can be used as a tagged template literal or a function. Three dashes (`---`) are used as a delimiter between slides.

**Tagged Template Literal Usage**

```jsx
<Deck ...>
  {MarkdownSlides`
## Slide One Title
Slide Content
---
## Slide Two Title
Slide Content
  `}
</Deck>
```

**Function Usage**

```jsx
import slidesMarkdown from "raw!markdown.md";

<Deck ...>
  {MarkdownSlides(slidesMarkdown)}
</Deck>
```

<a name="layout-tags"></a>
### Layout Tags

Layout tags are used for layout using Flexbox within your slide. They are `Layout`, `Fit` & `Fill`.

<a name="layout"></a>
#### Layout

The layout tag is used to wrap `Fit` and `Fill` tags to provide a row.

<a name="fit"></a>
#### Fit

The fit tag only takes up as much space as its bounds provide.

<a name="fill"></a>
#### Fill

The fill tag takes up all the space available to it. For example, if you have a `Fill` tag next to a `Fit` tag, the `Fill` tag will take up the rest of the space. Adjacent `Fill` tags split the difference and form an equidistant grid.

<a name="markdown-tag"></a>
### Markdown Tag

<a name="markdown"></a>
#### Markdown

The Markdown tag is used to add inline markdown to your slide. You can provide markdown source via the `source` prop, or as children. You can also provide a custom [mdast configuration](https://github.com/wooorm/mdast) via the `mdastConfig` prop.

Markdown generated tags aren't prop configurable, and instead render with your theme defaults.

|Name|PropType|Description|
|---|---|---|
|source|PropTypes.string| Markdown source |
|mdastConfig| PropTypes.object | Mdast configuration object |

<a name="element-tags"></a>
### Element Tags

The element tags are the bread and butter of your slide content. Most of these tags derive their props from the Base class, but the ones that have special options will have them listed:

<a name="appear"></a>
#### Appear

This tag does not extend from Base. It's special. Wrapping elements in the appear tag makes them appear/disappear in order in response to navigation.

<a name="blockquote-quote-and-cite-base"></a>
#### BlockQuote, Quote and Cite (Base)

These tags create a styled blockquote. Use them as follows:

```jsx
<BlockQuote>
  <Quote>Ken Wheeler is amazing</Quote>
  <Cite>Everyone</Cite>
</BlockQuote>
```

<a name="codepane-base"></a>
#### CodePane (Base)

This tag displays a styled, highlighted code preview. I prefer putting my code samples in external `.example` files and requiring them using `raw-loader` as shown in the demo. Here are the props:

|Name|PropType|Description|
|---|---|---|
|lang|PropTypes.string| Prism compatible language name. i.e: 'javascript' |
|source| PropTypes.string| String of code to be shown |

You can change your syntax highlighting theme by swapping the prism.js CSS file in `index.html`

<a name="code-base"></a>
#### Code (Base)

A simple tag for wrapping inline text that you want lightly styled in a monospace font.

<a name="component-playground"></a>
#### Component Playground

This tag displays a two-pane view with a ES6 source code editor on the right and a preview pane on the left for showing off custom React components. `React` and `render` from `ReactDOM` are supplied as variables. To render a component use the domContainer `mountNode`. Any `console` output will be forwarded to the main console in the browser.


|Name|PropType|Description|
|---|---|---|
|code|PropTypes.string|The code block you want to initially supply to the component playground. If none is supplied a demo component will be displayed.|
|previewBackgroundColor|PropTypes.string|The background color you want for the preview pane. Defaults to `#fff`.|
|theme|PropTypes.string|Accepts `light` or `dark` for the source editor's syntax highlighting. Defaults to `light`.|
|scope|PropTypes.object|Defines any outside modules or components to expose to the playground. React, Component, and render are supplied for you.|

Example code blocks:

```jsx
const Button = ({ title }) => (<button type="button">{ title }</button>);
render(<Button title="My Button" />, mountNode);
```

```jsx
class View extends React.Component {
  componentDidMount() {
    console.log("Hello");
  }

  render() {
    return (<div>My View</div>);
  }
}
render(<View />, mountNode);
```

<a name="heading-base"></a>
#### Heading (Base)

Heading tags are special in that, when you specify a `size` prop, they generate the appropriate heading tag, and extend themselves with a style that is defined in the theme file for that heading. Line height can be adjusted via a numeric `lineHeight` prop.

|Name|PropType|Description|
|---|---|---|
|fit|PropTypes.boolean| When set to true, fits text to the slide's width. **Note: If you use the 'scale' transition, this won't work in Safari.** |
|lineHeight|PropTypes.number| Sets the line height of your text.|

<a name="image-base"></a>
#### Image (Base)

|Name|PropType|Description|
|---|---|---|
|display|PropTypes.string| Set the display style property of the image |
|height|PropTypes.string or PropTypes.number| Supply a height to the image |
|src|PropTypes.string| Image src |
|width|PropTypes.string or PropTypes.number| Supply a width to the image |

<a name="link-base"></a>
#### Link (Base)

The link tag is used to render `<a>` tags. It accepts an `href` prop:

|Name|PropType|Description|
|---|---|---|
|href|PropTypes.string| String of url for `href` attribute |
|target|PropTypes.string| Set the `target` attribute |

<a name="list--listitem-base"></a>
#### List & ListItem (Base)

|Name|PropType|Description|
|---|---|---|
|ordered|PropTypes.bool| Render as `<ol>`-tag|
|reversed|PropTypes.bool| Set the `reversed` attribute |
|start|PropTypes.bool| Set the `start` attribute, Default: 1 |
|type|PropTypes.bool| Set the `type` attribute. Default: "1" |

These tags create lists. Use them as follows:

Ordered lists:
```jsx
<List ordered start={2} type="A">
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
  <ListItem>Item 4</ListItem>
</List>
```

Unordered lists:
```jsx
<List>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
  <ListItem>Item 4</ListItem>
</List>
```

<a name="s-base"></a>
#### S (Base)

The `S` tag is used to add inline styling to a piece of text, such as underline or strikethrough.

|Name|PropType|Description|
|---|---|---|
|type|PropTypes.string| Accepts `strikethrough`, `underline`, `bold` or `italic`|

<a name="table-tablerow-tableheaderitem-and-tableitem-base"></a>
#### Table, TableRow, TableHeaderItem and TableItem (Base)

The `Table` tag is used to add table to your slide. It is used with `TableHeader`, `TableBody`, `TableRow`, `TableHeaderItem` and `TableItem`. Use them as follows:

```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHeaderItem></TableHeaderItem>
      <TableHeaderItem>2011</TableHeaderItem>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableItem>None</TableItem>
      <TableItem>61.8%</TableItem>
    </TableRow>
    <TableRow>
      <TableItem>jQuery</TableItem>
      <TableItem>28.3%</TableItem>
    </TableRow>
  </TableBody>
</Table>
```

<a name="text-base"></a>
#### Text (Base)

The `Text` tag is used to add text to your slide. Line height can be adjusted via a numeric `lineHeight` prop.

|Name|PropType|Description|
|---|---|---|
|fit|PropTypes.boolean| When set to true, fits text to the slide's width. **Note: If you use the 'scale' transition, this won't work in Safari.** |
|lineHeight|PropTypes.number| Sets the line height of your text.|

<a name="base-props"></a>
### Base Props

Every component above that has `(Base)` after it has been extended from a common class that includes the following props:

| Name | PropType | Description |
| ---- | -------- | ----------- |
| italic | PropTypes.boolean | Set `fontStyle` to `italic` |
| bold | PropTypes.boolean | Set `fontWeight` to `bold ` |
| caps | PropTypes.boolean | Set `textTransform` to `uppercase ` |
| margin | PropTypes.number or string | Set `margin` value|
| padding | PropTypes.number or string | Set `padding` value|
| textColor | PropTypes.string | Set `color` value|
| textSize | PropTypes.string | Set `fontSize` value|
| textAlign | PropTypes.string | Set `textAlign` value|
| textFont | PropTypes.string | Set `textFont` value|
| bgColor | PropTypes.string | Set `backgroundColor` value|
| bgImage | PropTypes.string | Set `backgroundImage` value|
| bgDarken | PropTypes.number | Float value from 0.0 to 1.0 specifying how much to darken the bgImage image|

<a name="typeface"></a>
#### Typeface

The `Typeface` tag is used to apply a specific font to text content. It can either use a font that exists on the system or load a font from the Google Fonts library. `Typeface` requires either `font` or `googleFont` to be defined.

| Name | PropType | Description |
| ---- | -------- | ----------- |
| font | PropTypes.string | Use a font from the local system |
| googleFont | PropTypes.string | Use a font from the Google Fonts library |
| weight | PropTypes.number | Numeric weight value for the font. Default: `400`. |
| italic | PropTypes.boolean | Use an italics variant of the font if it exists. Default: `false`. |

```jsx
<Typeface googleFont="Roboto Slab" weight={600}>
  <Text>This text is using bold Roboto Slab from Google Fonts.</Text>
</Typeface>
```

```jsx
<Typeface font="SF Text" weight={400} italic={true}>
  <Text>This text is using the San Francisco Text font from the system.</Text>
</Typeface>
```

<a name="third-party"></a>
## Third Party Extensions

- [Spectacle Code Slide](https://github.com/thejameskyle/spectacle-code-slide) - Step through lines of code using this awesome slide extension by @thejameskyle
- [Spectacle Terminal Slide](https://github.com/elijahmanor/spectacle-terminal) - Terminal component that can be used in a spectacle slide deck by @elijahmanor
