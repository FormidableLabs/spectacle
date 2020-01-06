<a name="tag-api"></a>

# Tag API

In Spectacle, presentations are composed of a set of base tags. We can separate these into three categories: Main tags, Layout tags & Element tags.

<a name="main-tags"></a>

## Main Tags

<a name="deck"></a>

### Deck

The Deck tag is the root level tag for your presentation. It supports the following props:

| Name                    | PropType          | Description                                                                                                                                                                                                                                                                   | Default         |
| ----------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| autoplay                | PropTypes.bool    | Automatically advance slides.                                                                                                                                                                                                                                                 | `false`         |
| autoplayDuration        | PropTypes.number  | Accepts integer value in milliseconds for global autoplay duration.                                                                                                                                                                                                           | `7000`          |
| autoplayLoop            | PropTypes.bool    | Keep slides in loop.                                                                                                                                                                                                                                                          | `true`          |
| autoplayOnStart         | PropTypes.bool    | Start presentation with autoplay on/not paused (if autoplay is enabled).                                                                                                                                                                                                      | `true`          |
| controls                | PropTypes.bool    | Show control arrows when not in fullscreen.                                                                                                                                                                                                                                   | `true`          |
| contentHeight           | PropTypes.numbers | Baseline content area height.                                                                                                                                                                                                                                                 | `700px`         |
| contentWidth            | PropTypes.numbers | Baseline content area width.                                                                                                                                                                                                                                                  | `1000px`        |
| disableKeyboardControls | PropTypes.bool    | Toggle keyboard control.                                                                                                                                                                                                                                                      | `false`         |
| onStateChange           | PropTypes.func    | Called whenever a new slide becomes visible with the arguments `(previousState, nextState)` where state refers to the outgoing and incoming `<Slide />`'s `state` props, respectively. The default implementation attaches the current state as a class to the document root. | see description |
| history                 | PropTypes.object  | Accepts custom configuration for [history](https://github.com/ReactTraining/history).                                                                                                                                                                                         |                 |
| progress                | PropTypes.string  | Accepts `pacman`, `bar`, `number` or `none`. To override the color, change the 'quaternary' color in the theme.                                                                                                                                                               | `pacman`        |
| showFullscreenControl   | PropTypes.bool    | Show the fullscreen control button in bottom right of the screen.                                                                                                                                                                                                             | `true`          |
| theme                   | PropTypes.object  | Accepts a theme object for styling your presentation.                                                                                                                                                                                                                         |                 |
| transition              | PropTypes.array   | Accepts `slide`, `zoom`, `fade` or `spin`, and can be combined. Sets global slide transitions. **Note: If you use the 'scale' transition, fitted text won't work in Safari.**                                                                                                 |                 |
| transitionDuration      | PropTypes.number  | Accepts integer value in milliseconds for global transition duration.                                                                                                                                                                                                         | `500`           |

<a name="slide-base"></a>

### Slide (Base)

The slide tag represents each slide in the presentation. Giving a slide tag an `id` attribute will replace its number based navigation hash with the `id` provided. It supports the following props, in addition to any of the props outlined in the [Base](#base-props) class props listing:

| Name               | PropType         | Description                                                                                                                                                                                                                                                                                  | Default                           |
| ------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| align              | PropTypes.string | Accepts a space delimited value for positioning interior content. The first value can be `flex-start` (left), `center` (middle), or `flex-end` (right). The second value can be `flex-start` (top) , `center` (middle), or `flex-end` (bottom).                                              | `align="center center"`           |
| controlColor       | PropTypes.string | Used to override color of control arrows on a per slide basis, accepts color aliases, or valid color values.                                                                                                                                                                                 | Set by `Deck`'s `control` prop    |
| goTo               | PropTypes.number | Used to navigate to a slide for out-of-order presenting. Slide numbers start at `1`. This can also be used to skip slides as well.                                                                                                                                                           |                                   |
| id                 | PropTypes.string | Used to create a string based hash.                                                                                                                                                                                                                                                          |                                   |
| maxHeight          | PropTypes.number | Used to set max dimensions of the Slide.                                                                                                                                                                                                                                                     |                                   |
| maxWidth           | PropTypes.number | Used to set max dimensions of the Slide.                                                                                                                                                                                                                                                     |                                   |
| notes              | PropTypes.string | Text which will appear in the presenter mode. Can be HTML.                                                                                                                                                                                                                                   |                                   |
| onActive           | PropTypes.func   | Optional function that is called with the slide index when the slide comes into view.                                                                                                                                                                                                        |                                   |
| progressColor      | PropTypes.string | Used to override color of progress elements on a per slide basis, accepts color aliases, or valid color values.                                                                                                                                                                              | `quaternary` color set by theme   |
| state              | PropTypes.string | Used to indicate that the deck is in a specific state. Inspired by [Reveal.js](https://github.com/hakimel/reveal.js)'s `data-state` attribute                                                                                                                                                |                                   |
| transition         | PropTypes.array  | Used to override transition prop on a per slide basis, accepts `slide`, `zoom`, `fade`, `spin`, or a [function](#transition-function), and can be combined. This will affect both enter and exit transitions. **Note: If you use the 'scale' transition, fitted text won't work in Safari.** | Set by `Deck`'s `transition` prop |
| transitionIn       | PropTypes.array  | Specifies the slide transition when the slide comes into view. Accepts the same values as transition.                                                                                                                                                                                        |
| transitionOut      | PropTypes.array  | Specifies the slide transition when the slide exits. Accepts the same values as transition.                                                                                                                                                                                                  | Set by `Deck`'s `transition` prop |
| transitionDuration | PropTypes.number | Accepts integer value in milliseconds for slide transition duration.                                                                                                                                                                                                                         | Set by `Deck`'s `transition` prop |

# <a name="transition-function"></a>

| Name                    | PropType          | Description                                                                                                                                                                                                                                                                   | Default         |
| ----------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| autoplay                | PropTypes.bool    | Automatically advance slides.                                                                                                                                                                                                                                                 | `false`         |
| autoplayDuration        | PropTypes.number  | Accepts integer value in milliseconds for global autoplay duration.                                                                                                                                                                                                           | `7000`          |
| autoplayLoop            | PropTypes.bool    | Keep slides in loop.                                                                                                                                                                                                                                                          | `true`          |
| autoplayOnStart         | PropTypes.bool    | Start presentation with autoplay on/not paused (if autoplay is enabled).                                                                                                                                                                                                      | `true`          |
| controls                | PropTypes.bool    | Show control arrows when not in fullscreen.                                                                                                                                                                                                                                   | `true`          |
| contentHeight           | PropTypes.numbers | Baseline content area height.                                                                                                                                                                                                                                                 | `700px`         |
| contentWidth            | PropTypes.numbers | Baseline content area width.                                                                                                                                                                                                                                                  | `1000px`        |
| disableKeyboardControls | PropTypes.bool    | Toggle keyboard control.                                                                                                                                                                                                                                                      | `false`         |
| disableTouchControls    | PropTypes.bool    | Toggle touch control.                                                                                                                                                                                                                                                         | `false`         |
| onStateChange           | PropTypes.func    | Called whenever a new slide becomes visible with the arguments `(previousState, nextState)` where state refers to the outgoing and incoming `<Slide />`'s `state` props, respectively. The default implementation attaches the current state as a class to the document root. | see description |
| history                 | PropTypes.object  | Accepts custom configuration for [history](https://github.com/ReactTraining/history).                                                                                                                                                                                         |                 |
| progress                | PropTypes.string  | Accepts `pacman`, `bar`, `number` or `none`. To override the color, change the 'quaternary' color in the theme.                                                                                                                                                               | `pacman`        |
| showFullscreenControl   | PropTypes.bool    | Show the fullscreen control button in bottom right of the screen.                                                                                                                                                                                                             | `true`          |
| theme                   | PropTypes.object  | Accepts a theme object for styling your presentation.                                                                                                                                                                                                                         |                 |
| transition              | PropTypes.array   | Accepts `slide`, `zoom`, `fade` or `spin`, and can be combined. Sets global slide transitions. **Note: If you use the 'scale' transition, fitted text won't work in Safari.**                                                                                                 |                 |
| transitionDuration      | PropTypes.number  | Accepts integer value in milliseconds for global transition duration.                                                                                                                                                                                                         | `500`           |

#### Slide Templates

GitHub user [@boardfish](https://github.com/boardfish) has documented an approach to using [higher-order components](https://reactjs.org/docs/higher-order-components.html) to create slide templates at [this repository](https://github.com/boardfish/spectacle-slide-templates).

#### SlideSet

With `SlideSet`, you can wrap multiple slide in it to apply the same style.

```jsx
<SlideSet style={{ border: '2px solid red' }}>
  <Slide>Slide1</Slide>
  <Slide>Slide2</Slide>
  <Slide>Slide3</Slide>
</SlideSet>
```

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

<a name="slide-base"></a>

#### Slide

The slide tag represents each slide in the presentation. Giving a slide tag an `id` attribute will replace its number based navigation hash with the `id` provided. It supports the following props, in addition to any of the props outlined in the [Base](#base-props) class props listing:

| Name               | PropType         | Description                                                                                                                                                                                                                                                                                  | Default                           |
| ------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| align              | PropTypes.string | Accepts a space delimited value for positioning interior content. The first value can be `flex-start` (left), `center` (middle), or `flex-end` (right). The second value can be `flex-start` (top) , `center` (middle), or `flex-end` (bottom).                                              | `align="center center"`           |
| controlColor       | PropTypes.string | Used to override color of control arrows on a per slide basis, accepts color aliases, or valid color values.                                                                                                                                                                                 | Set by `Deck`'s `control` prop    |
| goTo               | PropTypes.number | Used to navigate to a slide for out-of-order presenting. Slide numbers start at `1`. This can also be used to skip slides as well.                                                                                                                                                           |                                   |
| id                 | PropTypes.string | Used to create a string based hash.                                                                                                                                                                                                                                                          |
| notes              | PropTypes.string | Text which will appear in the presenter mode. Can be HTML.                                                                                                                                                                                                                                   |                                   |
| onActive           | PropTypes.func   | Optional function that is called with the slide index when the slide comes into view.                                                                                                                                                                                                        |                                   |
| progressColor      | PropTypes.string | Used to override color of progress elements on a per slide basis, accepts color aliases, or valid color values.                                                                                                                                                                              | `quaternary` color set by theme   |
| state              | PropTypes.string | Used to indicate that the deck is in a specific state. Inspired by [Reveal.js](https://github.com/hakimel/reveal.js)'s `data-state` attribute                                                                                                                                                |                                   |
| transition         | PropTypes.array  | Used to override transition prop on a per slide basis, accepts `slide`, `zoom`, `fade`, `spin`, or a [function](#transition-function), and can be combined. This will affect both enter and exit transitions. **Note: If you use the 'scale' transition, fitted text won't work in Safari.** | Set by `Deck`'s `transition` prop |
| transitionIn       | PropTypes.array  | Specifies the slide transition when the slide comes into view. Accepts the same values as transition.                                                                                                                                                                                        |
| transitionOut      | PropTypes.array  | Specifies the slide transition when the slide exits. Accepts the same values as transition.                                                                                                                                                                                                  | Set by `Deck`'s `transition` prop |
| transitionDuration | PropTypes.number | Accepts integer value in milliseconds for slide transition duration.                                                                                                                                                                                                                         | Set by `Deck`'s `transition` prop |
|                    |

### Transition Function

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

### Notes

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

The MarkdownSlides function lets you create a single or multiple slides using Markdown. It can be used as a tagged template literal or a function. Three dashes (`---` are used as a delimiter between slides.

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
const slidesMarkdown = `
## Slide One Title
Slide Content
---
## Slide Two Title
Slide Content
  `;

  ....

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

#### Markdown Tag

The Markdown tag is used to add inline markdown to your slide. You can provide markdown source via the `source` prop, or as children. You can also provide a custom [mdast configuration](https://github.com/wooorm/mdast) via the `mdastConfig` prop.

Markdown generated tags aren't prop configurable, and instead render with your theme defaults.

| Name   | PropType         | Description     | Default |
| ------ | ---------------- | --------------- | ------- |
| source | PropTypes.string | Markdown source |         |

<a name="magic-tag"></a>

### Magic Tag

<a name="Magic"></a>

_NOTE: The Magic tag uses the Web Animations API. If you use the Magic tag and want it to work places other than Chrome, you will need to include the polyfill [https://github.com/web-animations/web-animations-js](https://github.com/web-animations/web-animations-js)_

The Magic Tag recreates Magic Move behavior that slide authors might be accustomed to coming from Keynote. It wraps slides and transitions between positional values for child elements. This means that if you have two similar strings, we will transition common characters to their new positions. This does not transition on non positional values such as slide background color or font size.

_<span role="img" aria-label="Warning Sign">⚠️ </span> WARNING: Do not use a `transition` prop on your slides if you are wrapping them with a Magic tag since it will take care of the transition for you._

```javascript
<Magic>
  <Slide>
    <Heading>First Heading</Heading>
  </Slide>
  <Slide>
    <Heading>Second Heading</Heading>
  </Slide>
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

For best performance, wrap the contents of this tag in a native DOM element like a `<div>` or `<span>`.

_NOTE: When using `CodePane` tag inside an `Appear` tag you must wrap it inside a `<div>`_

```jsx
....
<Appear>
  <div>
    <CodePane source="CodePane" lang="js" />
  </div>
<Appear>
....
```

| Name               | PropType         | Description                                                                                                                                                                                                      | Default          |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| order              | PropTypes.number | An optional integer starting at 1 for the presentation order of the Appear tags within a slide. If a slide contains ordered and unordered Appear tags, the unordered will show first.                            |
| transitionDuration | PropTypes.number | An optional duration (in milliseconds) for the Appear animation.                                                                                                                                                 | `300`            |
| startValue         | PropTypes.object | An optional style object that defines the starting, inactive state of the Appear tag. The default animation is a fade-in.                                                                                        | `{ opacity: 0 }` |
| endValue           | PropTypes.object | An optional style object that defines the ending, active state of the Appear tag. The default animation is a simple fade-in.                                                                                     | `{ opacity: 1 }` |
| easing             | PropTypes.string | An optional victory easing curve for the Appear animation. The various options are documented in the [Victory Animation easing docs](https://formidable.com/open-source/victory/docs/victory-animation/#easing). | `quadInOut`      |

<a name="anim"></a>

### Anim

If you want extra flexibility with animated animation, you can use the Anim component instead of Appear. It will let you have multi-step animations for each individual fragment. You can use this to create fancy animated intros, in-slide carousels, and many other fancy things. This tag does not extend from Base. It's special.

For best performance, wrap the contents of this tag in a native DOM element like a `<div>` or `<span>`.

_NOTE: `CodePane` tag can not be used inside a `Anim` tag._

| Name               | PropType         | Description                                                                                                                                                                                                                                | Default         |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| order              | PropTypes.number | An optional integer for the presentation order of the Appear tags within a slide. If a slide contains ordered and unordered Appear tags, the unordered will show first.                                                                    | Starting at `1` |
| transitionDuration | PropTypes.number | A duration (in milliseconds) for the animation.                                                                                                                                                                                            | `300`           |
| fromStyle          | PropTypes.object | A style object that defines the starting, inactive state of the Anim tag.                                                                                                                                                                  |                 |
| toStyle            | PropTypes.array  | An array of style objects that define each step in the animation. They will step from one toStyle object to another, until that fragment is finished with its animations.                                                                  |                 |
| easing             | PropTypes.string | A victory easing curve for the Appear animation. The various options are documented in the [Victory Animation easing docs](https://formidable.com/open-source/victory/docs/victory-animation/#easing).                                     |                 |
| onAnim             | PropTypes.fun    | This function is called every time the Anim component plays an animation. It'll be called with two arguments, forwards, a boolean indicating if it was stepped forwards or backwards, and the index of the animation that was just played. |                 |

<a name="blockquote-quote-and-cite-base"></a>

#### BlockQuote, Quote and Cite

These tags create a styled blockquote. Use them as follows:

```jsx
<BlockQuote>
  <Quote>Ken Wheeler is amazing</Quote>
  <Cite>Everyone</Cite>
</BlockQuote>
```

_NOTE: By default the text color of the `Quote` tag is the same as the background color and may not show up. Use the `bgColor` and/or `textColor` props on the `Slide` or `Quote` tags to make it visible._

```jsx
<Slide transition={['fade']} bgColor="secondary" textColor="primary">
  <BlockQuote>
    <Quote>Example Quote</Quote>
    <Cite>Author</Cite>
  </BlockQuote>
</Slide>
```

```jsx
<Slide transition={['fade']}>
  <BlockQuote>
    <Quote textColor="secondary">Example Quote</Quote>
    <Cite>Author</Cite>
  </BlockQuote>
</Slide>
```

<a name="codepane-base"></a>

#### CodePane

This tag displays a styled, highlighted code preview. I prefer putting my code samples in external `.example` files and requiring them using `raw-loader` as shown in the demo. Here are the props:

| Name      | PropType         | Description                                                                         | Default |
| --------- | ---------------- | ----------------------------------------------------------------------------------- | ------- |
| lang      | PropTypes.string | Prism compatible language name. i.e: 'javascript'                                   |         |
| source    | PropTypes.string | String of code to be shown                                                          |         |
| className | PropTypes.string | String of a className to be appended to the CodePane                                |         |
| theme     | PropTypes.string | Accepts `light`, `dark`, or `external` for the source editor's syntax highlighting. | `dark`  |

If you want to change the theme used here, you can include a prism theme in index.html via a style or a link tag. For your theme to be actually applied
correctly you need to set the `theme` prop to `"external"`, which disables our builtin light and dark themes.
Please note that including a theme can actually influence all CodePane and Playground components, even if you don't set this prop, since some Prism
themes use very generic CSS selectors.

CodePane and Playground both use the prism library under the hood, which has several themes that are available to include.

<a name="code-base"></a>

#### Code

A simple tag for wrapping inline text that you want lightly styled in a monospace font.

<a name="component-playground"></a>

#### Component Playground

This tag displays a two-pane view with a ES6 source code editor on the right and a preview pane on the left for showing off custom React components. `React` and `render` are supplied as variables. To render a component call `render` with some JSX code. Any `console` output will be forwarded to the main console in the browser.

For more information on the playground read the docs over at [react-live](https://github.com/FormidableLabs/react-live).

| Name                   | PropType         | Description                                                                                                                      | Default |
| ---------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------- |
| code                   | PropTypes.string | The code block you want to initially supply to the component playground. If none is supplied a demo component will be displayed. |         |
| previewBackgroundColor | PropTypes.string | The background color you want for the preview pane.                                                                              | `#fff`  |
| theme                  | PropTypes.string | Accepts `light`, `dark`, or `external` for the source editor's syntax highlighting.                                              | `dark`  |
| scope                  | PropTypes.object | Defines any outside modules or components to expose to the playground. React, Component, and render are supplied for you.        |         |

Example code blocks:

```jsx
const Button = ({ title }) => <button type="button">{title}</button>;
render(<Button title="My Button" />);
```

```jsx
class View extends React.Component {
  componentDidMount() {
    console.log('Hello');
  }

  render() {
    return <div>My View</div>;
  }
}
render(<View />);
```

If you want to change the theme used here, please refer to the instructions above in the [CodePane's API reference](#codepane-base).

<a name="go-to-action"></a>

#### Go To Action

The GoToAction tag lets you jump to another slide in your deck. The GoToAction can be used a simple button that supports `Base` styling or accept a render prop with a callback to support custom components.

| Name   | PropType                             | Description                                                                                                                                | Default         |
| ------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| slide  | PropTypes.string or PropTypes.number | The string identifier or number of the side the button should jump to. This is only used in the simple button configuration.               | Starting at `1` |
| render | PropTypes.func                       | A function with a `goToSlide` param that should return a React element to render. This is only used in the custom component configuration. |                 |

##### Simple Button Configuration Example

```jsx
<GoToAction slide={3}>Jump to 3</GoToAction>
```

##### Custom Component Configuration Example

```jsx
<GoToAction
  render={goToSlide => (
    <CustomComponent onClick={() => goToSlide('wait-wut')}>
      WAIT WUT!?
    </CustomComponent>
  )}
/>
```

<a name="heading-base"></a>

#### Heading

Heading tags are special in that, when you specify a `size` prop, they generate the appropriate heading tag, and extend themselves with a style that is defined in the theme file for that heading. Line height can be adjusted via a numeric `lineHeight` prop.

| Name       | PropType          | Description                                                                                                               | Default |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------- | ------- |
| fit        | PropTypes.boolean | When set to true, fits text to the slide's width. **Note: If you use the 'scale' transition, this won't work in Safari.** | `false` |
| lineHeight | PropTypes.number  | Sets the line height of your text.                                                                                        |
| size       | PropTypes.number  | Sets the heading tag                                                                                                      |

<a name="image-base"></a>

#### Image

| Name    | PropType                             | Description                                    | Default |
| ------- | ------------------------------------ | ---------------------------------------------- | ------- |
| alt     | PropTypes.string                     | Set the `alt` attribute of the image           |         |
| display | PropTypes.string                     | Set the `display` style attribute of the image |         |
| height  | PropTypes.string or PropTypes.number | Set the `height` to the image                  |         |
| src     | PropTypes.string                     | Set the `src` attribute of the image           |         |
| width   | PropTypes.string or PropTypes.number | Set the `width` to the image                   |         |

<a name="link-base"></a>

#### Link

The link tag is used to render `<a>` tags. It accepts an `href` prop:

| Name   | PropType         | Description                        | Default |
| ------ | ---------------- | ---------------------------------- | ------- |
| href   | PropTypes.string | String of url for `href` attribute |         |
| target | PropTypes.string | Set the `target` attribute         | `_self` |

#### List & ListItem

| Name        | PropType         | Description                                                                                                                                                                                                                                                                                                                                                                | Default |
| ----------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| ordered     | PropTypes.bool   | Render as `<ol>` tag                                                                                                                                                                                                                                                                                                                                                       |         |
| reversed    | PropTypes.bool   | Set the `reversed` attribute                                                                                                                                                                                                                                                                                                                                               |         |
| start       | PropTypes.number | Set the `start` attribute.                                                                                                                                                                                                                                                                                                                                                 | `1`     |
| type        | PropTypes.string | Set the `type` attribute.                                                                                                                                                                                                                                                                                                                                                  | `"1"`   |
| bulletStyle | PropTypes.string | Allows to customize list bullets for unordered-list. You can set `bulletStyle="star"` both in `List` and `ListItem` components. When `ListItem` prop is set it will overwrite the `List` styling only for the specific `ListItem`. You can either use built-in strings: `star`, `classicCheck`, `greenCheck`, `arrow`, `cross`, or any unicode number `bulletStyle="274C"` |

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
  <ListItem bulletStyle="arrow">Item 2</ListItem>
  <ListItem>Item 3</ListItem>
  <ListItem>Item 4</ListItem>
</List>
```

<a name="s-base"></a>

#### S

The `S` tag is used to add styling to a piece of text, such as underline or strikethrough.

| Name | PropType         | Description                                              | Default |
| ---- | ---------------- | -------------------------------------------------------- | ------- |
| type | PropTypes.string | Accepts `strikethrough`, `underline`, `bold` or `italic` |         |

<a name="table-tablerow-tableheaderitem-and-tableitem-base"></a>

#### Table, TableRow, TableHeaderItem and TableItem

The `Table` tag is used to add table to your slide. It is used with `TableHeader`, `TableBody`, `TableRow`, `TableHeaderItem` and `TableItem`. Use them as follows:

```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHeaderItem />
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

#### Text

The `Text` tag is used to add text to your slide. Line height can be adjusted via a numeric `lineHeight` prop.

| Name       | PropType          | Description                                                                                                               | Default |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------- | ------- |
| fit        | PropTypes.boolean | When set to true, fits text to the slide's width. **Note: If you use the 'scale' transition, this won't work in Safari.** |         |
| lineHeight | PropTypes.number  | Sets the line height of your text.                                                                                        |         |

<a name="typeface"></a>

### Typeface

### Base Props ([Base](#base-props))

Every component above that has `(Base)` after it has been extended from a common class that includes the following props:

| Name         | PropType                   | Description                                                                  | Default         |
| ------------ | -------------------------- | ---------------------------------------------------------------------------- | --------------- |
| italic       | PropTypes.boolean          | Set `fontStyle` to `italic`                                                  | `false`         |
| bold         | PropTypes.boolean          | Set `fontWeight` to `bold`                                                   | `false`         |
| caps         | PropTypes.boolean          | Set `textTransform` to `uppercase`                                           | `false`         |
| margin       | PropTypes.number or string | Set `margin` value                                                           |                 |
| padding      | PropTypes.number or string | Set `padding` value                                                          |                 |
| textColor    | PropTypes.string           | Set `color` value                                                            |                 |
| textFont     | PropTypes.string           | Set `fontFamily` value                                                       |                 |
| textSize     | PropTypes.string           | Set `fontSize` value                                                         |                 |
| textAlign    | PropTypes.string           | Set `textAlign` value                                                        |                 |
| bgColor      | PropTypes.string           | Set `backgroundColor` value                                                  |                 |
| bgGradient   | PropTypes.string           | Set `backgroundImage` value                                                  |                 |
| bgImage      | PropTypes.string           | Set `backgroundImage` value                                                  |                 |
| bgImageStyle | PropTypes.string           | Set backgroundImage css property value directly                              |                 |
| bgSize       | PropTypes.string           | Set `backgroundSize` value                                                   | `cover`         |
| bgPosition   | PropTypes.string           | Set `backgroundPosition` value                                               | `center center` |
| bgRepeat     | PropTypes.string           | Set `backgroundRepeat` value                                                 |                 |
| bgDarken     | PropTypes.number           | Float value from 0.0 to 1.0 specifying how much to darken the bgImage image  | 0               |
| bgLighten    | PropTypes.number           | Float value from 0.0 to 1.0 specifying how much to lighten the bgImage image | 0               |
| overflow     | PropTypes.string           | Set `overflow` value                                                         |                 |
| height       | PropTypes.string           | Set `height` value                                                           |                 |

_NOTE: When using `bgImage` prop for local images, you must import the file for it to render properly._

```jsx
import myImage from './images/my-image.jpg';

......

<Slide bgImage={myImage}>
  I have an image for a background
</Slide>
```

<a name="typeface"></a>

#### Typeface

The `Typeface` tag is used to apply a specific font to text content. It can either use a font that exists on the system or load a font from the Google Fonts library. `Typeface` requires either `font` or `googleFont` to be defined.

| Name       | PropType          | Description                                      | Default |
| ---------- | ----------------- | ------------------------------------------------ | ------- |
| font       | PropTypes.string  | Use a font from the local system                 |         |
| googleFont | PropTypes.string  | Use a font from the Google Fonts library         |         |
| weight     | PropTypes.number  | Numeric weight value for the font.               | `400`   |
| italic     | PropTypes.boolean | Use an italics variant of the font if it exists. | `false` |

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

The MarkdownSlides function lets you create a single or multiple slides using Markdown. It can be used as a tagged template literal or a function. Three dashes (`---` are used as a delimiter between slides.

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
const slidesMarkdown = `
## Slide One Title
Slide Content
---
## Slide Two Title
Slide Content
  `;

  ....
import slidesMarkdown from "!raw-loader!markdown.md";

<Deck ...>
{MarkdownSlides(slidesMarkdown)}
</Deck>
```
