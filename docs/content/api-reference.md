---
title: API Reference
order: 5
---

# API Reference

In Spectacle, presentations are composed of a set of base tags. We can separate these into three categories: [Main tags](#main-tags), [Typography tags](#typography-tags) & [Layout tags](#layout-tags).

## Main Tags

These are the bare bones of a Spectacle presentation, the two most essential tags you'll need to assemble a slideshow.

### Deck

Wraps the entire presentation and carries most of the overarching slide logic, like `theme` and `template` context.
A `template` contains Layout tags (referred to as a template render function) and is supplied to the `Deck` component to apply to all subsequent `Slide`s.

| Props              | Type                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `theme`            | [Styled-system theme object](./themes)                                                   |
| `template`         | [Template render function](#layout-tags)                                                 |
| `transitionEffect` | `"fade"`, `"slide"`, `"none"`, or [custom transition object](./props/#transition-object) |

### Slide

Wraps a single slide within your presentation; identifies what is contained to a single view. If a transition effect is applied to this slide, it will override the Deck-specified transition.

| Props                | Type                                                                               |
| -------------------- | ---------------------------------------------------------------------------------- |
| `backgroundColor`    | PropTypes.string                                                                   |
| `backgroundImage`    | PropTypes.string                                                                   |
| `backgroundOpacity`  | PropTypes.number                                                                   |
| `backgroundPosition` | PropTypes.string                                                                   |
| `backgroundRepeat`   | PropTypes.string                                                                   |
| `backgroundSize`     | PropTypes.string                                                                   |
| `scaleRatio`         | PropTypes.number                                                                   |
| `slideNum`           | PropTypes.number                                                                   |
| `template`           | PropTypes.func                                                                     |
| `textColor`          | PropTypes.string                                                                   |
| `transitionEffect`   | "fade", "slide", "none", or [custom transition object](./props/#transition-object) |

## Typography Tags

These tags are for displaying textual content.

| Tag Name            | Theme Props                                                                                                 | Additional Props           | Default Props                                                                                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Text`**          | [**Space**](./props#space)<br />[**Color**](./props#color)<br /> [**Typography**](./props#typography)       | —                          | **color**: primary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textAlign**: left<br />**margin**: textMargin                                       |
| **`Heading`**       | [**Space**](./props#space)<br />[**Color**](./props#color)<br /> [**Typography**](./props#typography)       | —                          | **color**: secondary<br /> **fontFamily**: header<br />**fontSize**: h1<br />**fontWeight**: bold<br />**textAlign**: center<br />**margin**: headerMargin       |
| **`Link`**          | [**Space**](./props#space)<br />[**Color**](./props#color)<br /> [**Typography**](./props#typography)<br /> | **href**: PropTypes.string | **color**: quaternary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textDecoration**: underline<br />**textAlign**: left<br />**margin**: textMargin |
| **`Quote`**         | [**Space**](./props#space)<br />[**Color**](./props#color)<br /> [**Typography**](./props#typography)<br /> | —                          | **color**: primary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textAlign**: left<br />**borderLeft**: 1px solid secondary                          |
| **`OrderedList`**   | [**Space**](./props#space)<br />[**Color**](./props#color)<br /> [**Typography**](./props#typography)       | —                          | **color**: primary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textAlign**: left<br />**margin**: listMargin                                       |
| **`UnorderedList`** | [**Space**](./props#space)<br />[**Color**](./props#color)<br /> [**Typography**](./props#typography)       | —                          | **color**: primary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textAlign**: left<br />**margin**: listMargin                                       |
| **`ListItem`**      | [**Space**](./props#space)<br />[**Color**](./props#color)<br /> [**Typography**](./props#typography)       | —                          | **margin**: listMargin                                                                                                                                           |
| **`CodeSpan`**      | [**Space**](./props#space)<br />[**Color**](./props#color)<br /> [**Typography**](./props#typography)       | —                          | **fontFamily**: monospace<br />**fontSize**: text                                                                                                                |

## Layout Tags

These tags are for adding structure to your slides.
A template render function consists of one or more Layout tags — it is supplied to the `Deck` component to apply to all subsequent `Slide`s.

| Tag Name      | Theme Props                                                                                                                                                                                               | Additional Props | Default Props     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------- |
| **`Box`**     | [**Space**](./props#space)<br />[**Color**](./props#color)<br />[**Layout**](./props#layout)<br />[**Position**](./props#position)<br /> [**Border**](./props#border)                                     | —                | —                 |
| **`FlexBox`** | [**Space**](./props#space)<br />[**Color**](./props#color)<br />[**Layout**](./props#layout)<br />[**Position**](./props#position)<br /> [**Border**](./props#border)<br />[**Flex**](./props#flex)<br /> | —                | —                 |
| **`Grid`**    | [**Layout**](./props#layout)<br />[**Position**](./props#position)<br />[**Grid**](./props#grid)<br />                                                                                                    | —                | **display**: grid |

## Table Tags

These tags are for adding tables with content to your slides.

| Tag Name          | Theme Props                                                                                                                                                               | Additional Props | Default Props                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Table`**       | [**Space**](./props#space)<br />[**Color**](./props#color)<br />[**Layout**](./props#layout)<br />[**Typography**](./props#typography)<br /> [**Border**](./props#border) | -                | **color**: primary<br />**fontFamily**: text<br />**fontSize**: text<br />**textAlign:** left<br />**margin**: listMargin                           |
| **`TableHeader`** | [**Space**](./props#space)<br />[**Color**](./props#color)<br />[**Layout**](./props#layout)<br />[**Typography**](./props#typography)<br /> [**Border**](./props#border) | -                | **color**: primary<br />**fontFamily**: text<br />**fontSize**: text<br />**fontWeight**: bold<br />**textAlign:** left<br />**margin**: listMargin |
| **`TableBody`**   | [**Space**](./props#space)<br />[**Color**](./props#color)<br />[**Layout**](./props#layout)<br />[**Typography**](./props#typography)<br /> [**Border**](./props#border) | -                | **color**: primary<br />**fontFamily**: text<br />**fontSize**: text<br />**textAlign:** left<br />**margin**: listMargin                           |
| **`TableRow`**    | [**Space**](./props#space)<br />[**Color**](./props#color)<br />[**Layout**](./props#layout)<br />[**Typography**](./props#typography)<br /> [**Border**](./props#border) | -                | **color**: primary<br />**fontFamily**: text<br />**fontSize**: text<br />**textAlign:** left<br />**margin**: listMargin                           |
| **`TableCell`**   | [**Space**](./props#space)<br />[**Color**](./props#color)<br />[**Layout**](./props#layout)<br />[**Typography**](./props#typography)<br /> [**Border**](./props#border) | -                | **color**: primary<br />**fontFamily**: text<br />**fontSize**: text<br />**textAlign:** left<br />**margin**: listMargin                           |

## Appear

Appear is a component that makes a component animate on the slide on key press. The default animation is opacity. It is currently required to specify the order of elements to be animated starting with `1`. Sequential `<Appear />` tags do not have to be in order.

| Props              | Type                                                        | Example                                        |
| ------------------ | ----------------------------------------------------------- | ---------------------------------------------- |
| `children`         | PropTypes.string                                            | `<Text>Hi</Text>`                              |
| `elementNum`       | PropTypes.number                                            | `1`                                            |
| `transitionEffect` | PropTypes.shape({<br/>to: object;<br />from: object;<br/>}) | `{ to: { opacity: 1 }, from: { opacity: 0 } }` |

## Code Pane

CodePane is a component for showing a syntax-highlighted block of source code. It will scroll for overflow amounts of code. The Code Pane will trim whitespace and normalize indents. It will also wrap long lines of code and preserve the indent. Optionally you can have the Code Pane fill the available empty space on your slide via the `autoFillHeight` prop. Themes are configurable objects and can be imported from the [prism-react-renderer themes](https://github.com/FormidableLabs/prism-react-renderer/tree/master/src/themes).

Additionally, `highlightStart` and `highlightEnd` props can be used to highlight certain ranges of code. Combine this with the [Stepper](#stepper) component to iterate over lines of code as you present.

| Props            | Type                                                                                         | Example               |
| ---------------- | -------------------------------------------------------------------------------------------- | --------------------- |
| `autoFillHeight` | PropTypes.boolean                                                                            | `false`               |
| `children`       | PropTypes.string                                                                             | `let name = "Carlos"` |
| `fontSize`       | PropTypes.number                                                                             | `16`                  |
| `highlightEnd`   | PropTypes.number                                                                             | `2`                   |
| `highlightStart` | PropTypes.number                                                                             | `1`                   |
| `language`       | PropTypes.string                                                                             | `javascript`          |
| `theme`          | [Prism Theme](https://github.com/FormidableLabs/prism-react-renderer/tree/master/src/themes) | —                     |

```jsx
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';

() => (
  <Slide>
    <CodePane language="javascript" theme={lightTheme}>
      {`
  function helloWorld() {
    console.log('Hello World!');
  }
`}
    </CodePane>
  </Slide>
);
```

## Stepper

Stepper is a render-prop component that allows you to step over a set of values in your presentation, providing the current value and step as arguments in the child function. Like [Appear](#appear), this iteration happens on key press. Especially useful for stepping through the [Code Pane](#code-pane) component.

```jsx
<Stepper values={[1, 2, 3]}>
  {(value, step) => <p>Current value: {value}</p>}
</Stepper>
```

## FullScreen

FullScreen is a button that takes the presentation in and out of the browser's full screen mode. It can have a different color and be re-sized.

| Props   | Type             | Example   |
| ------- | ---------------- | --------- |
| `size`  | PropTypes.number | `23`      |
| `color` | PropTypes.string | `#abc123` |

## Image

Image is a component to display a picture within a slide. It is analgous to an `<img>` tag and conforms to Layout and Position props.

| Props                              | Type             |
| ---------------------------------- | ---------------- |
| src                                | PropTypes.string |
| [**`Layout`**](./props#layout)     |                  |
| [**`Position`**](./props#position) |                  |

## Markdown

Markdown is a component to author slides or slide content using Markdown. Regular Markdown tags get converted into Spectacle components. The `---` three dash marker is used to divide content into separate slides. When using the `---` as a slide delimiter it is required to set the `containsSlides` prop to `true`. Markdown also supports presenter notes using the `Notes:` marker.

| Props            | Type              | Example      |
| ---------------- | ----------------- | ------------ |
| `children`       | PropTypes.string  | `# Hi there` |
| `containsSlides` | PropTypes.boolean | `true`       |

```jsx
<Slide>
  <Markdown>
    # Urql
    A highly customizable and versatile GraphQL client
  <Markdown>
  <Text>Made by Formidable</Text>
</Slide>
<Markdown containsSlides>
  # Writing queries

  When this hook is executed it will send the query and variables to your GraphQL API.

  ---

  # Writing mutations

  urql will by default come with a simple "document" cache. Each query with variables that is requested from a GraphQL API, the result will be cached completely.

  Notes: The easiest way to always display up-to-date data is to set the requestPolicy to 'cache-and-network'.
<Markdown>
```

## Notes

Notes is a component that only renders in Presenter mode as presenter notes. It is used as the last component inside your slide but does not show on the deck.

| Props      | Type             | Example           |
| ---------- | ---------------- | ----------------- |
| `children` | PropTypes.string | `Presenter Notes` |

```jsx
<Slide>
  <Heading>Urql</Heading>
  <Text>A highly customizable and versatile GraphQL client</Text>
  <Notes>
    Urql is a GraphQL client that exposes a set of React components and hooks.
  </Notes>
</Slide>
```

## Progress

Progress is a component with no children that just shows dots for each slide in your deck. Visited and current slides are represented by a filled circle and future slides with just a stroke. The size and color are customizable.

| Props   | Type             | Example   |
| ------- | ---------------- | --------- |
| `size`  | PropTypes.number | `23`      |
| `color` | PropTypes.string | `#abc123` |
