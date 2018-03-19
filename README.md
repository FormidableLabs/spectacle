# Spectacle

[![Join the chat at https://gitter.im/FormidableLabs/spectacle](https://badges.gitter.im/FormidableLabs/spectacle.svg)](https://gitter.im/FormidableLabs/spectacle?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Travis Status][trav_img]][trav_site]
ReactJS based Presentation Library

[Spectacle Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate/)

## Contents

<!-- MarkdownTOC depth=4 autolink=true bracket=round autoanchor=true -->

- [Getting Started](#getting-started)
- [One Page](#one-page)
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
- [FAQ](#faq)
- [Tag API](#tag-api)
  - [Main Tags](#main-tags)
    - [Deck](#deck)
    - [Slide (Base)](#slide-base)
    - [Notes](#notes)
    - [MarkdownSlides](#markdown-slides)
  - [Layout Tags](#layout-tags)
    - [Layout](#layout)
    - [Fit](#fit)
    - [Fill](#fill)
  - [Markdown Tag](#markdown-tag)
    - [Markdown](#markdown)
  - [Magic Tag](#magic-tag)
    - [Magic](#magic)
  - [Element Tags](#element-tags)
    - [Appear](#appear)
    - [BlockQuote, Quote and Cite (Base)](#blockquote-quote-and-cite-base)
    - [CodePane (Base)](#codepane-base)
    - [Code (Base)](#code-base)
    - [ComponentPlayground](#component-playground)
    - [GoToAction (Base)](#go-to-action)
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

The new best way to get started is by running `create-react-app my-presentation --scripts-version spectacle-scripts`. This will use `create-react-app` to create almost everything you need. This however, doesn't include publish scripts, and ejecting is required for fancy stuff.

The second best way to get started is by using the [Spectacle Boilerplate](https://github.com/FormidableLabs/spectacle-boilerplate).

Alternatively, you can `npm install spectacle` and write your own build configurations. We also provide full UMD builds (with a `Spectacle` global variable) of the library at `dist/spectacle.js` and `dist/spectacle.min.js` for more general use cases. You could, for example, include the library via a script tag with: `https://unpkg.com/spectacle@VERSION/dist/spectacle.min.js`.

Note that we have webpack externals for `react`, `react-dom`, and `prop-types`, so you will need to provide them in your upstream build or something like linking in via `script` tags in your HTML page for all three libraries. This comports with our project dependencies which place these three libraries in `peerDependencies`.

But really, it is SO much easier to just use the boilerplate. Trust me.

<a name="one-page"></a>
## One Page

To aid with speedy development / kicking the tires on spectacle, we support using a simple boilerplate HTML page with a bespoke script tag that contains your entire presentation. The rest of the setup will take care of transpiling your React/ESnext code, providing Spectacle, React, and ReactDOM libraries, and being raring to go with a minimum of effort.

We can start with this project's sample at [`one-page.html`](./one-page.html). It's essentially, the same presentation as the fully-built-from-source version, with a few notable exceptions:

1. There are no `import`s or `require`s. Everything must come from the global namespace. This includes `Spectacle`, `React`, `ReactDOM` and all the Spectacle exports from [`./src/index.js`](./src/index.js) -- `Deck`, `Slide`, `themes`, etc.
2. The presentation must include exactly **one** script tag with the type `text/spectacle` that is a function. Presently, that function is directly inserted inline into a wrapper code boilerplate as a React Component `render` function. The wrapper is transpiled. There should not be any extraneous content around it like outer variables or comments.

    **Good** examples:

    ```html
    <script type="text/spectacle">
      () => (
        <Deck>{/* SLIDES */}</Deck>
      )
    </script>
    ```

    ```html
    <script type="text/spectacle">
      () => {
        // Code-y code stuff in JS...

        return (
          <Deck>{/* SLIDES */}</Deck>
        );
      }
    </script>
    ```

    **Bad** examples of what not to do:

    ```html
    <script type="text/spectacle">
      // Outer comment (BAD)
      const outerVariable = "BAD";

      () => (
        <Deck>{/* SLIDES */}</Deck>
      )
    </script>
    ```

... with those guidelines in mind, here's the boilerplate that you can literally copy-and-paste into an HTML file and start a Spectacle presentation that works from the get go!

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width initial-scale=1 user-scalable=no" />
    <title>Spectacle</title>
    <link href="https://fonts.googleapis.com/css?family=Lobster+Two:400,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700" rel="stylesheet" type="text/css">
    <link href="https://unpkg.com/normalize.css@7/normalize.css" rel="stylesheet" type="text/css">
</head>
<body>
    <div id="root"></div>
    <script src="https://unpkg.com/prop-types@15/prop-types.js"></script>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
    <script src="https://unpkg.com/spectacle@^4/dist/spectacle.js"></script>
    <script src="https://unpkg.com/spectacle@^4/lib/one-page.js"></script>
    <script type="text/spectacle">
      () => {
        // Your JS Code goes here

        return (
          <Deck>
          {/* Throw in some slides here! */}
          </Deck>
        );
      }
    </script>
</body>
</html>
```

<a name="development"></a>
## Development

After downloading the boilerplate, your first order of business is to open terminal and run `npm install`

Next run `rm -R .git` to remove the existing version control.

Then, to start up the local server, run `npm start`

Open a browser and hit [http://localhost:3000](http://localhost:3000), and we are ready to roll

<a name="build--deployment"></a>
## Build & Deployment

Building the dist version of the slides is as easy as running `npm run build:dist`

If you want to deploy the slideshow to surge, run `npm run deploy`

<span role="img" aria-label="Warning Sign">⚠️</span> If you are deploying the dist version to [GitHub Pages](https://pages.github.com/ 'GitHub Pages'), note that the built bundle uses an absolute path to the `/dist/` directory while GitHub Pages requires the relative `./dist/` to find any embedded assets and/or images. A very hacky way to fix this is to edit one place in the produced bundle, as shown [in this GitHub issue](https://github.com/FormidableLabs/spectacle/issues/326#issue-233283633 'GitHub: spectacle issue #326').

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
|Alt/Option + A|Start autoplay (if enabled)|

<a name="fullscreen"></a>
## Fullscreen

Fullscreen can be toggled via browser options, or by **hovering over the bottom right corner of your window until the fullscreen icon appears and clicking it**.

<a name="pdf-export"></a>
## PDF Export

Exporting a totally sweet looking PDF from your totally sweet looking Spectacle presentation is absurdly easy. You can either do this via the browser, or from the command line:

#### CLI

- Run `npm install spectacle-renderer -g`
- Run `npm start` on your project and wait for it to build and be available
- Run `spectacle-renderer`
- A totally cool PDF is created in your project directory

For more options and configuration of this tool, check out:

[https://github.com/FormidableLabs/spectacle-renderer](https://github.com/FormidableLabs/spectacle-renderer)


#### Browser

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

The bare minimum you need to start is a `Deck` element and a `Slide` element. Each `Slide` element represents a slide inside of your slideshow.

<a name="themes"></a>
### Themes

In Spectacle, themes are functions that return style objects for `screen` & `print`.

You can import the default theme from:

```jsx
import createTheme from "spectacle/lib/themes/default";
```

Or create your own based upon the source.

`index.js` is what you would edit in order to create a custom theme of your own, using object based styles.

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

<a name="faq"></a>
## FAQ

_How can I easily style the base components for my presentation?_

Historically, custom styling in Spectacle has meant screwing with a theme file, or using gross `!important` overrides. We fixed that. Spectacle is now driven by [emotion](https://github.com/emotion-js/emotion), so you can bring your own styling library, whether its emotion itself, or something like styled-components or glamorous. For example, if you want to create a custom Heading style:

```javascript
import styled from 'styled-components';
import { Heading } from 'spectacle';

const CustomHeading = styled(Heading)`
  font-size: 1.2em;
  color: papayawhip;
`;
```

_How can I separate my slides into other files?_

Until this release, you would have to do some array shenanigans, but now you can just wrap those slides with an element that has a special prop:

```javascript
// mySlides.js
export default class mySlides extends Component {
  render() {
    return (
      <div hasSlideChildren>
        <Slide>1</Slide>
        <Slide>2</Slide>
        <Slide>3</Slide>
      </div>
    )
  }
}

```

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
|contentHeight| PropTypes.numbers| Baseline content area height (default: 700)
|contentWidth| PropTypes.numbers| Baseline content area width (default: 1000)
|history|PropTypes.object|Accepts custom configuration for [history](https://github.com/ReactTraining/history)
|progress| PropTypes.string|Accepts `pacman`, `bar`, `number` or `none`. To override the color, change the 'quarternary' color in the theme.
|theme|PropTypes.object|Accepts a theme object for styling your presentation|
|transition|PropTypes.array|Accepts `slide`, `zoom`, `fade` or `spin`, and can be combined. Sets global slide transitions. **Note: If you use the 'scale' transition, fitted text won't work in Safari.**|
|transitionDuration| PropTypes.number| Accepts integer value in milliseconds for global transition duration.
|autoplay|PropTypes.bool| Automatically advance slides.
|autoplayDuration|PropTypes.number| Accepts integer value in milliseconds for global autoplay duration, defaults to 7000.

<a name="slide-base"></a>
#### Slide (Base)

The slide tag represents each slide in the presentation. Giving a slide tag an `id` attribute will replace its number based navigation hash with the `id` provided. It supports the following props, in addition to any of the props outlined in the Base class props listing:

|Name|PropType|Description|
|---|---|---|
|align| PropTypes.string | Accepts a space delimited value for positioning interior content. The first value can be `flex-start` (left), `center` (middle), or `flex-end` (right). The second value can be `flex-start` (top) , `center` (middle), or `flex-end` (bottom). You would provide this prop like `align="center center"`, which is its default.
|controlColor| PropTypes.string | Used to override color of control arrows on a per slide basis, accepts color aliases, or valid color values.
|goTo| PropTypes.number | Used to navigate to a slide for out-of-order presenting. Slide numbers start at `1`. This can also be used to skip slides as well.
|id| PropTypes.string | Used to create a string based hash.
|maxHeight| PropTypes.number | Used to set max dimensions of the Slide.
|maxWidth| PropTypes.number | Used to set max dimensions of the Slide.
|notes| PropTypes.string| Text which will appear in the presenter mode. Can be HTML.
|onActive|PropTypes.func| Optional function that is called with the slide index when the slide comes into view.
|progressColor| PropTypes.string | Used to override color of progress elements on a per slide basis, accepts color aliases, or valid color values.
|transition|PropTypes.array|Accepts `slide`, `zoom`, `fade`, `spin`, or a [function](#transition-function), and can be combined. Sets the slide transition. This will affect both enter and exit transitions. **Note: If you use the 'scale' transition, fitted text won't work in Safari.**|
|transitionIn|PropTypes.array|Specifies the slide transition when the slide comes into view. Accepts the same values as transition.|
|transitionOut|PropTypes.array|Specifies the slide transition when the slide exits. Accepts the same values as transition.|
|transitionDuration| PropTypes.number| Accepts integer value in milliseconds for slide transition duration.

<a name="wrapping-slides"></a>
##### Wrapping Slides

If you author your slides in another file or want any kind of grouping that requires one additional level of nesting, you can add a `hasSlideChildren` prop to their parent element. This lets Spectacle identify that it is a wrapper, and will disregard the heirarchy instead opting to read the child slides as if the wrapper was not present.

<a name="transition-function"></a>
##### Transition Function
Spectacle now supports defining custom transitions. The function prototype is `(transitioning: boolean, forward: boolean) => Object`. The `transitioning` param is true when the slide enters and exits. The `forward` param is `true` when the slide is entering, `false` when the slide is exiting. The function returns a style object. You can mix string-based transitions and functions. Styles provided when `transitioning` is `false` will appear during the lifecyle of the slide. An example is shown below:

```jsx
<Slide
  transition={[
    'fade',
    (transitioning, forward) => {
      const angle = forward ? -180 : 180;
      return {
        transform: `
          translate3d(0%, ${transitioning ? 100 : 0}%, 0)
          rotate(${transitioning ? angle : 0}deg)
        `,
        backgroundColor: transitioning ? '#26afff' : '#000'
      };
    }
  ]}
>
```

<a name="notes"></a>
#### Notes

The notes tag allows to use any tree of react elements as the notes of a slide. It is used as a child node of a slide tag and its children override any value given as the `notes` attribute of its parent slide.

```jsx
<Slide ...>
  <Notes>
    <h4>Slide notes</h4>
    <ol>
      <li>First note</li>
      <li>Second note</li>
    </ol>
  </Notes>
  {/* Slide content */}
</Slide>
```

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
import slidesMarkdown from "raw-loader!markdown.md";

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
#### Markdown (Base)

The Markdown tag is used to add inline markdown to your slide. You can provide markdown source via the `source` prop, or as children. You can also provide a custom [mdast configuration](https://github.com/wooorm/mdast) via the `mdastConfig` prop.

Markdown generated tags aren't prop configurable, and instead render with your theme defaults.

|Name|PropType|Description|
|---|---|---|
|source|PropTypes.string| Markdown source |

<a name="magic-tag"></a>
### Magic Tag

<a name="Magic"></a>
#### Magic

> NOTE: The Magic tag uses the Web Animations API. If you use the Magic tag and want it to work places other than Chrome, you will need to include the polyfill [https://github.com/web-animations/web-animations-js](https://github.com/web-animations/web-animations-js)

The Magic Tag is a new experimental feature that attempts to recreate Magic Move behavior that slide authors might be accustomed to coming from Keynote. It wraps slides, and transitions between positional values for child elements. This means that if you have two similar strings, we will transition common characters to their new positions. This does not transition on non positional values such as slide background color or font size. Do not use a `transition` prop on your slides if you are wrapping them with a Magic tag since it will take care of the transition for you.

Using Magic is pretty simple, you just wrap your slides with it, and it transitions between them:

```javascript
<Magic>
  <Slide><Heading>First Heading</Heading></Slide>
  <Slide><Heading>Second Heading</Heading></Slide>
</Magic>
```

Transitioning between similar states will vary based upon the input content. It will look better when there are more common elements. An upcoming patch will allow for custom keys, which will provide greater control over which elements are identified as common for reuse.

Until then, feedback is very welcome, as this is a non-trivial feature and we anticipate iterating on the behind the scenes mechanics of how it works, so that we can accommodate most use cases.

<a name="element-tags"></a>
### Element Tags

The element tags are the bread and butter of your slide content. Most of these tags derive their props from the Base class, but the ones that have special options will have them listed:

<a name="appear"></a>
#### Appear

This tag does not extend from Base. It's special. Wrapping elements in the appear tag makes them appear/disappear in order in response to navigation.

|Name|PropType|Description|
|---|---|---|
|order|PropTypes.number| An optional integer starting at 1 for the presentation order of the Appear tags within a slide. If a slide contains ordered and unordered Appear tags, the unordered will show first.
|transitionDuration|PropTypes.number|An optional duration (in milliseconds) for the Appear animation. Default value is `300`.
|startValue|Proptypes.object|An optional style object that defines the starting, inactive state of the Appear tag. The default animation is a simple fade-in, so the default `startValue` value is `{ opacity: 0 }`.
|endValue|Proptypes.object|An optional style object that defines the ending, active state of the Appear tag. The default animation is a simple fade-in, so the default `endValue` value is `{ opacity: 1 }`.
|easing|PropTypes.string|An optional victory easing curve for the Appear animation. The various options are documented in the [Victory Animation easing docs](https://formidable.com/open-source/victory/docs/victory-animation/#easing). Default value is `quadInOut`


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
|className| PropTypes.string| String of a className to be appended to the CodePane |
|theme| PropTypes.string| Accepts `light`, `dark`, or `external` for the source editor's syntax highlighting. Defaults to `dark`. |

If you want to change the theme used here, you can include a prism theme in index.html via a style or a link tag. For your theme to be actually applied
correctly you need to set the `theme` prop to `"external"`, which disables our builtin light and dark themes.
Please note that including a theme can actually influence all CodePane and Playground components, even if you don't set this prop, since some Prism
themes use very generic CSS selectors.

CodePane and Playground both use the prism library under the hood, which has several themes that are available to include.

<a name="code-base"></a>
#### Code (Base)

A simple tag for wrapping inline text that you want lightly styled in a monospace font.

<a name="component-playground"></a>
#### Component Playground

This tag displays a two-pane view with a ES6 source code editor on the right and a preview pane on the left for showing off custom React components. `React` and `render` are supplied as variables. To render a component call `render` with some JSX code. Any `console` output will be forwarded to the main console in the browser.

For more information on the playground read the docs over at [react-live](https://github.com/FormidableLabs/react-live).

|Name|PropType|Description|
|---|---|---|
|code|PropTypes.string|The code block you want to initially supply to the component playground. If none is supplied a demo component will be displayed.|
|previewBackgroundColor|PropTypes.string|The background color you want for the preview pane. Defaults to `#fff`.|
|theme| PropTypes.string| Accepts `light`, `dark`, or `external` for the source editor's syntax highlighting. Defaults to `dark`. |
|scope|PropTypes.object|Defines any outside modules or components to expose to the playground. React, Component, and render are supplied for you.|

Example code blocks:

```jsx
const Button = ({ title }) => (<button type="button">{ title }</button>);
render(<Button title="My Button" />);
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
render(<View />);
```

If you want to change the theme used here, please refer to the instructions above in the [CodePane's API reference](#codepane-base).

<a name="go-to-action"></a>
#### Go To Action (Base)

The GoToAction tag lets you jump to another slide in your deck. The GoToAction can be used a simple button that supports `Base` styling or accept a render prop with a callback to support custom components.

|Name|PropType|Description|
|---|---|---|
|slide|PropTypes.string or PropTypes.number|The string identifier or number of the side the button should jump to. Slide numbers start at `1`. This is only used in the simple button configuration.
|render|PropTypes.func|A function with a `goToSlide` param that should return a React element to render. This is only used in the custom component configuration.

##### Simple Button Configuration Example
```jsx
<GoToAction slide={3}>Jump to 3</GoToAction>
```

##### Custom Component Configuration Example
```jsx
<GoToAction
  render={goToSlide => (
    <CustomComponent onClick={() => goToSlide("wait-wut")}>
      WAIT WUT!?
    </CustomComponent>
  )}
/>
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
|alt|PropTypes.string| Set the `alt` property of the image|
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

The `S` tag is used to add styling to a piece of text, such as underline or strikethrough.

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
| textFont | PropTypes.string | Set `fontFamily` value|
| textSize | PropTypes.string | Set `fontSize` value|
| textAlign | PropTypes.string | Set `textAlign` value|
| textFont | PropTypes.string | Set `textFont` value|
| bgColor | PropTypes.string | Set `backgroundColor` value|
| bgImage | PropTypes.string | Set `backgroundImage` value|
| bgSize | PropTypes.string | Set `backgroundSize` value|
| bgPosition | PropTypes.string | Set `backgroundPosition` value|
| bgRepeat | PropTypes.string | Set `backgroundRepeat` value|
| bgDarken | PropTypes.number | Float value from 0.0 to 1.0 specifying how much to darken the bgImage image|
| overflow | PropTypes.string | Set `overflow` value|
| height | PropTypes.string | Set `height` value|

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
- [Spectacle Image Slide](https://github.com/FezVrasta/spectacle-image-slide) - Show a slide with a big image and a title on top

[trav_img]: https://api.travis-ci.org/FormidableLabs/spectacle.svg
[trav_site]: https://travis-ci.org/FormidableLabs/spectacle
