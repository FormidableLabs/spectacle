---
title: API Reference
order: 4
---

<a name="api-reference"></a>

# API Reference

In Spectacle, presentations are composed of a set of base tags. We can separate these into three categories: [Main tags](#main-tags), [Semantic tags](#semantic-tags) & [Style tags](#style-tags).

<a name="main-tags"></a>

## Main Tags

These are the bare bones of a Spectacle presentation, the two most essential tags you'll need to assemble a slideshow.

<a name="deck"></a>

### Deck

Wraps the entire presentation and carries most of the overarching slide logic, like theme and template context.

| Props    | Type                                       |
| -------- | ------------------------------------------ |
| theme    | [Styled-system theme object](TODO)         |
| template | [Template render function](#deck-template) |

<a name="slide"></a>

### Slide

Wraps a single slide within your presentation; identifies what is contained to a single view.

No props are directly passed to this tag as the `Deck` and semantic tags within the `Slide` will handle most of your layout and theming.

<a name="semantic-tags"></a>

## Typography Tags

These tags are for displaying textual content.

| Tag Name                                       | Theme Props                                                                                                             | Additional Props           | Default Props                                                                                                                                                    |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a name="text">**Text**</a>                    | [**Space**](/docs/props#space)<br />[**Color**](/docs/props#color)<br /> [**Typography**](/docs/props#typography)       | —                          | **color**: primary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textAlign**: left<br />**margin**: textMargin                                       |
| <a name="heading">**Heading**</a>              | [**Space**](/docs/props#space)<br />[**Color**](/docs/props#color)<br /> [**Typography**](/docs/props#typography)       | —                          | **color**: secondary<br /> **fontFamily**: header<br />**fontSize**: h1<br />**fontWeight**: bold<br />**textAlign**: center<br />**margin**: headerMargin       |
| <a name="link">**Link**</a>                    | [**Space**](/docs/props#space)<br />[**Color**](/docs/props#color)<br /> [**Typography**](/docs/props#typography)<br /> | **href**: PropTypes.string | **color**: quaternary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textDecoration**: underline<br />**textAlign**: left<br />**margin**: textMargin |
| <a name="quote">**Quote**</a>                  | [**Space**](/docs/props#space)<br />[**Color**](/docs/props#color)<br /> [**Typography**](/docs/props#typography)<br /> | —                          | **color**: primary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textAlign**: left<br />**borderLeft**: 1px solid secondary                          |
| <a name="ordered-list">**OrderedList**</a>     | [**Space**](/docs/props#space)<br />[**Color**](/docs/props#color)<br /> [**Typography**](/docs/props#typography)       | —                          | **color**: primary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textAlign**: left<br />**margin**: listMargin                                       |
| <a name="unordered-list">**UnorderedList**</a> | [**Space**](/docs/props#space)<br />[**Color**](/docs/props#color)<br /> [**Typography**](/docs/props#typography)       | —                          | **color**: primary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textAlign**: left<br />**margin**: listMargin                                       |
| <a name="list-item">**ListItem**</a>           | [**Space**](/docs/props#space)<br />[**Color**](/docs/props#color)<br /> [**Typography**](/docs/props#typography)       | —                          | **margin**: listMargin                                                                                                                                           |
| <a name="code-span">**CodeSpan**</a>           | [**Space**](/docs/props#space)<br />[**Color**](/docs/props#color)<br /> [**Typography**](/docs/props#typography)       | —                          | **fontFamily**: monospace<br />**fontSize**: text                                                                                                                |

## Layout Tags

These tags are for adding structure to your slides.

| Tag Name                           | Theme Props                                                                                                                                                                                                                       | Additional Props | Default Props     |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------- |
| <a name="box">**Box**</a>          | [**Space**](/docs/props#space)<br />[**Color**](/docs/props#color)<br />[**Layout**](/docs/props#layout)<br />[**Position**](/docs/props#position)<br /> [**Border**](/docs/props#border)                                         | —                | —                 |
| <a name="flex-box">**FlexBox**</a> | [**Space**](/docs/props#space)<br />[**Color**](/docs/props#color)<br />[**Layout**](/docs/props#layout)<br />[**Position**](/docs/props#position)<br /> [**Border**](/docs/props#border)<br />[**Flex**](/docs/props#flex)<br /> | —                | —                 |
| <a name="grid">**Grid**</a>        | [**Layout**](/docs/props#layout)<br />[**Position**](/docs/props#position)<br />[**Grid**](/docs/props#grid)<br />                                                                                                                | —                | **display**: grid |

<a name="progress"></a>

## Progress

Progress is a component with no children that just shows dots for each slide in your deck. Visited and current slides are represented by a filled circle and future slides with just a stroke. The size and color are customizable.

| Props | Type             | Example   |
| ----- | ---------------- | --------- |
| size  | PropTypes.number | `23`      |
| color | PropTypes.string | `#abc123` |

<a name="full-screen"></a>

## FullScreen

FullScreen is a button that takes the presentation in and out of the browser's full screen mode. It can have a different color and be re-sized.

| Props | Type             | Example   |
| ----- | ---------------- | --------- |
| size  | PropTypes.number | `23`      |
| color | PropTypes.string | `#abc123` |

<a name="code-pane"></a>

## Code Pane

CodePane is a component for showing a syntax-highlighted block of source code. It will scroll for overflow amounts of code. The Code Pane will trim whitespace and normalize indents. It will also wrap long lines of code and preserve the indent. Optionally you can have the Code Pane fill the available empty space on your slide via the `autoFillHeight` prop. Themes are configurable objects and can be imported from the [prism-react-renderer themes](https://github.com/FormidableLabs/prism-react-renderer/tree/master/src/themes).

| Props          | Type              | Example               |
| -------------- | ----------------- | --------------------- |
| autoFillHeight | PropTypes.boolean | `false`               |
| children       | PropTypes.string  | `let name = "Carlos"` |
| fontSize       | PropTypes.number  | `16`                  |
| language       | PropTypes.string  | `javascript`          |
| theme          | Prism Theme       | —                     |

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

<a name="appear"></a>

## Appear

Appear is a component that makes a component animate on the slide on key press. The default animation is opacity. It is currently required to specify the order of elements to be animated starting with `1`. Sequential `<Appear />` tags do not have to be in order.

| Props            | Type                          | Example                                        |
| ---------------- | ----------------------------- | ---------------------------------------------- |
| children         | PropTypes.string              | `<Text>Hi</Text>`                              |
| elementNum       | PropTypes.number              | `1`                                            |
| transitionEffect | { to: object; from: object; } | `{ to: { opacity: 1 }, from: { opacity: 0 } }` |

<a name="notes"></a>

## Notes

Notes is a component that only renders in Presenter mode for presenter notes. It is used as the last component inside your slide but does not show on the deck.

| Props    | Type             | Example           |
| -------- | ---------------- | ----------------- |
| children | PropTypes.string | `Presenter Notes` |

```jsx
<Slide>
  <Heading>Urql</Heading>
  <Text>A highly customizable and versatile GraphQL client</Text>
  <Notes>
    Urql is a GraphQL client that exposes a set of React components and hooks.
  </Notes>
</Slide>
```

<a name="image"></a>

### Image

Image is a component to display a picture within a slide. It is analgous to an `<img>` tag and conforms to Layout and Position props.

| Props                                | Type             |
| ------------------------------------ | ---------------- |
| src                                  | PropTypes.string |
| [**Layout**](/docs/props#layout)     |                  |
| [**Position**](/docs/props#position) |                  |

<a name="markdown"></a>

## Markdown

Markdown is a component to author slides or slide content using Markdown. Regular Markdown tags get converted into Spectacle components. The `---` three dash marker is used to divide content into separate slides. When using the `---` as a slide delimiter it is required to set the `containsSlides` prop to `true`. Markdown also supports presenter notes using the `Notes:` marker.

| Props          | Type              | Example      |
| -------------- | ----------------- | ------------ |
| children       | PropTypes.string  | `# Hi there` |
| containsSlides | PropTypes.boolean | `true`       |

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

<a name="deck-template"></a>

## Deck Template

A template in Spectacle is a fixed overlay of components that are presented on every slide. They are similar to masters in Keynote or PowerPoint. It’s a function prop that has a single optional config object containing current slide and total slide count and returns a React Node.

```jsx
<Deck template=(({ slideNumber, numberOfSlides }) => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Box padding="0 1em">
      <FullScreen />
    </Box>
    <Box padding="1em">
      <Progress />
      Slide {slideNumber} of {numberOfSlides}
    </Box>
  </FlexBox>
))>
```

![A screenshot of Progress in use](TODO)
