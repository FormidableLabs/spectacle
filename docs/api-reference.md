---
title: API Reference
order: 5
sidebar_position: 5
---

# API Reference

In Spectacle, presentations are composed of a set of base tags. We can separate these into three categories: [Main tags](#main-tags), [Typography tags](#typography-tags) & [Layout tags](#layout-tags).

## Main Tags

These are the bare bones of a Spectacle presentation, the two most essential tags you'll need to assemble a slideshow.

### Deck

Wraps the entire presentation and carries most of the overarching slide logic, like `theme` and `template` context.
A `template` contains Layout tags (referred to as a template render function) and is supplied to the `Deck` component to apply to all subsequent `Slide`s. The last three props are for print and export mode only, they have no effect on the audience or presenter views. The `pageSize` and `pageOrientation` props correspond to the size and orientation values for the [CSS media print size selector](https://developer.mozilla.org/en-US/docs/Web/CSS/@page/size). The `pageSize` is automatically set based on the deck theme slide size for a best-fit using export to PDF mode. If you need to print your deck, supply your paper size using the `pageSize` prop. The `printScale` is the ratio for the selected page size, orientation, and slide size. `0.958` is the best ratio for to ensure the PDF export fits the slide theme size. Currently, only Chrome and Chromium-based browsers fully implement the custom page size CSS media print specification. Other browsers such as Firefox and Safari can still export to PDF but the page size will not be a best fit.

| Props              | Type                                        | Default            |
| ------------------ | ------------------------------------------- | ------------------ |
| `theme`            | [Styled-system theme object](./themes.md)      |                    |
| `template`         | [Template render function](#layout-tags)    |                    |
| `pageSize`         | PropTypes.string                            | `"13.66in 7.68in"` |
| `pageOrientation`  | `"landscape"` or `"portrait"`               | `"landscape"`      |
| `printScale`       | PropTypes.number                            | `0.959`            |
| `autoPlay`         | PropTypes.bool                              | `false`            |
| `autoPlayLoop`     | PropTypes.bool                              | `false`            |
| `autoPlayInterval` | PropTypes.number (milliseconds)             | `1000`             |
| `transition`       | [**Transition**](./props.md#transition-object) | `slideTransition`  |
| `backgroundImage`  | PropTypes.string                            |                    |


### Slide

Wraps a single slide within your presentation; identifies what is contained to a single view. If a transition effect is applied to this slide, it will override the Deck-specified transition.

| Props                | Type                                        |
| -------------------- | ------------------------------------------- |
| `backgroundColor`    | PropTypes.string                            |
| `backgroundImage`    | PropTypes.string                            |
| `backgroundOpacity`  | PropTypes.number                            |
| `backgroundPosition` | PropTypes.string                            |
| `backgroundRepeat`   | PropTypes.string                            |
| `backgroundSize`     | PropTypes.string                            |
| `scaleRatio`         | PropTypes.number                            |
| `slideNum`           | PropTypes.number                            |
| `template`           | PropTypes.func                              |
| `textColor`          | PropTypes.string                            |
| `transition`         | [**Transition**](./props.md#transition-object) |

## Typography Tags

These tags are for displaying textual content.

| Tag Name            | Theme Props                                                                                                 | Additional Props           | Default Props                                                                                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Text`**          | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br /> [**Typography**](./props.md#typography)       | —                          | **color**: primary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textAlign**: left<br />**margin**: textMargin                                       |
| **`Heading`**       | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br /> [**Typography**](./props.md#typography)       | —                          | **color**: secondary<br /> **fontFamily**: header<br />**fontSize**: h1<br />**fontWeight**: bold<br />**textAlign**: center<br />**margin**: headerMargin       |
| **`Link`**          | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br /> [**Typography**](./props.md#typography)<br /> | **href**: PropTypes.string | **color**: quaternary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textDecoration**: underline<br />**textAlign**: left<br />**margin**: textMargin |
| **`Quote`**         | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br /> [**Typography**](./props.md#typography)<br /> | —                          | **color**: primary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textAlign**: left<br />**borderLeft**: 1px solid secondary                          |
| **`OrderedList`**   | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br /> [**Typography**](./props.md#typography)       | —                          | **color**: primary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textAlign**: left<br />**margin**: listMargin                                       |
| **`UnorderedList`** | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br /> [**Typography**](./props.md#typography)       | —                          | **color**: primary<br /> **fontFamily**: text<br />**fontSize**: text<br />**textAlign**: left<br />**margin**: listMargin                                       |
| **`ListItem`**      | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br /> [**Typography**](./props.md#typography)       | —                          | **margin**: listMargin                                                                                                                                           |
| **`CodeSpan`**      | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br /> [**Typography**](./props.md#typography)       | —                          | **fontFamily**: monospace<br />**fontSize**: text                                                                                                                |

## Layout Tags

These tags are for adding structure to your slides.
A template render function consists of one or more Layout tags — it is supplied to the `Deck` component to apply to all subsequent `Slide`s.

| Tag Name      | Theme Props                                                                                                                                                                                               | Additional Props | Default Props     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------- |
| **`Box`**     | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br />[**Layout**](./props.md#layout)<br />[**Position**](./props.md#position)<br /> [**Border**](./props.md#border)                                     | —                | —                 |
| **`FlexBox`** | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br />[**Layout**](./props.md#layout)<br />[**Position**](./props.md#position)<br /> [**Border**](./props.md#border)<br />[**Flex**](./props.md#flex)<br /> | —                | —                 |
| **`Grid`**    | [**Layout**](./props.md#layout)<br />[**Position**](./props.md#position)<br />[**Grid**](./props.md#grid)<br />                                                                                                    | —                | **display**: grid |

## Table Tags

These tags are for adding tables with content to your slides.

| Tag Name          | Theme Props                                                                                                                                                               | Additional Props | Default Props                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Table`**       | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br />[**Layout**](./props.md#layout)<br />[**Typography**](./props.md#typography)<br /> [**Border**](./props.md#border) | -                | **color**: primary<br />**fontFamily**: text<br />**fontSize**: text<br />**textAlign:** left<br />**margin**: listMargin                           |
| **`TableHeader`** | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br />[**Layout**](./props.md#layout)<br />[**Typography**](./props.md#typography)<br /> [**Border**](./props.md#border) | -                | **color**: primary<br />**fontFamily**: text<br />**fontSize**: text<br />**fontWeight**: bold<br />**textAlign:** left<br />**margin**: listMargin |
| **`TableBody`**   | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br />[**Layout**](./props.md#layout)<br />[**Typography**](./props.md#typography)<br /> [**Border**](./props.md#border) | -                | **color**: primary<br />**fontFamily**: text<br />**fontSize**: text<br />**textAlign:** left<br />**margin**: listMargin                           |
| **`TableRow`**    | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br />[**Layout**](./props.md#layout)<br />[**Typography**](./props.md#typography)<br /> [**Border**](./props.md#border) | -                | **color**: primary<br />**fontFamily**: text<br />**fontSize**: text<br />**textAlign:** left<br />**margin**: listMargin                           |
| **`TableCell`**   | [**Space**](./props.md#space)<br />[**Color**](./props.md#color)<br />[**Layout**](./props.md#layout)<br />[**Typography**](./props.md#typography)<br /> [**Border**](./props.md#border) | -                | **color**: primary<br />**fontFamily**: text<br />**fontSize**: text<br />**textAlign:** left<br />**margin**: listMargin                           |

## useSteps

The `useSteps` hook allows a component to participate in the _slide step sequence_ for a given Slide. It must be called inside a component that sits somewhere underneath a slide component, i.e., `<Slide><MyComponentThatUsesUseStepsInside /></Slide>`, so it can access the `SlideContext` managed by the Slide component.

NOTE: the vast majority of use cases are covered by the `Stepper` and `Appear` components documented below- in fact, they are implemented via this hook. The only case in which you may need to use this hook explicitly is if you need more precise control over a component in your presentation.

### Arguments and Options

- `numSteps` The first argument to this hook, `numSteps`, indicates how many steps your component will occupy in the slide step sequence. The second argument is an options object which accepts two options: `id` and `stepIndex`.
- `options.id`: _(For debugging and testing purposes only.)_ Allows you to customize the step sequence ID for this component.
- `options.priority`: Allows fine-grained control over the sequencing of multiple step sequence participants in a given Slide. By default, participants will be activated in the order in which they are rendered. However, this option allows you to specify a "priority"- for instance, a participant with `priority: -1` will run before any other participant, _regardless_ of render order.

### Return Values

This hook returns four values: `stepId`, `isActive`, `step`, and `placeholder`.

- `stepId`: _(For debugging and testing purposes only.)_ Either the `id` option passed into the hook, or a randomly-generated ULID.
- `step`: the _relative_ step within this participant's step sequence. Before the slide has reached this participant, this value is `-1`. When the slide reaches this stepper, it will increase at each step until it reaches `numSteps - 1`, and will remain there after the slide step has 'passed' it.
- `isActive`: Boolean value indicating whether the slide step sequence has reached this participant. Equivalent to the expression `step >= 0`.
- `placeholder`: DOM node which _must_ be rendered by the consumer component- this is how a Slide detects step sequence participants.

## Stepper

`<Stepper>` is a thin wrapper around `useSteps`. The length of its `values` list indicates the number of steps it occupies in the slide step sequence. Each of these values are passed in turn to the render function you provide. Additionally, it allows you to specify styles which should be applied before and after it is activated, and uses `react-spring` to interpolate between the 'active style' and the 'inactive style'.

The render function you provide (either via the `render` prop or as a '`children` function') is called with three arguments:

- The element of the list passed to `values` which corresponds to the current step (or `undefined` if the Stepper is inactive)
- The current step _relative_ to this Stepper's sequence (which will be `-1` if the Stepper is inactive)
- A boolean value (`isActive`) indicating whether the Stepper is active.

For instance, suppose we render a slide like this:

```jsx
<Slide>
  <p>Hello, world!</p>
  <Stepper tagName="p" alwaysVisible values={['foo', 'bar']}>
    {(value, step, isActive) =>
      isActive
        ? `The first stepper is not active. Step: ${step} Value: ${value}`
        : `The first stepper is active. Step: ${step} Value: ${value}`
    }
  </Stepper>
  <Stepper tagName="p" alwaysVisible values={['baz', 'quux']}>
    {(value, step, isActive) =>
      isActive
        ? `The second stepper is not active. Step: ${step} Value: ${value}`
        : `The second stepper is active. Step: ${step} Value: ${value}`
    }
  </Stepper>
</Slide>
```

The following output will be rendered as you step through the slide:

```html
<!-- When the slide is first rendered (slide step 0) -->
<p>Hello, world!</p>
<p>The first stepper is not active. Step: -1 Value: undefined</p>
<p>The second stepper is not active. Step: -1 Value: undefined</p>

<!-- slide step 1 -->
<p>Hello, world!</p>
<p>The first stepper is active. Step: 0 Value: foo</p>
<p>The second stepper is not active. Step: -1 Value: undefined</p>

<!-- slide step 2 -->
<p>Hello, world!</p>
<p>The first stepper is active. Step: 1 Value: bar</p>
<p>The second stepper is not active. Step: -1 Value: undefined</p>

<!-- slide step 3 -->
<p>Hello, world!</p>
<p>The first stepper is active. Step: 1 Value: bar</p>
<p>The second stepper is active. Step: 0 Value: baz</p>

<!-- slide step 3 -->
<p>Hello, world!</p>
<p>The first stepper is active. Step: 1 Value: bar</p>
<p>The second stepper is active. Step: 0 Value: baz</p>

<!-- slide step 4 -->
<p>Hello, world!</p>
<p>The first stepper is active. Step: 1 Value: bar</p>
<p>The second stepper is active. Step: 1 Value: quux</p>
```

### Props

- `id`: _(For debugging and testing purposes only)_ Passed to `useSteps`.
- `priority`: Passed to `useSteps`.
- `render`: Render function (see above.)
- `children`: Render function (see above.)
- `className`: Class name applied to the animated container element.
- `tagName`: Tag which will be used as the animated container element. Defaults to `div`.
- `values`: Values array (see description above).
- `alwaysVisible`: Forces this stepper to always have its active style applied.
- `activeStyle`: Style object applied when this `<Stepper>` is active. Defaults to `{ opacity: 1 }`.
- `inactiveStyle`: Style object applied when this `<Stepper>` is inactive. Defaults to `{ opacity: 0 }`.

## Appear

Appear is a thin wrapper around `useSteps`. It occupies a single step within the slide step sequence. It wraps its child elements in an animated container element, and uses `react-spring` to interpolate between its `activeStyle` and `inactiveStyle`.

### Props

- `id`: _(For debugging and testing purposes only)_ Passed to `useSteps`.
- `priority`: Passed to `useSteps`.
- `children`: Children rendered within this `Appear`.
- `className`: Class name applied to the animated container element.
- `tagName`: Tag which will be used as the animated container element. Defaults to `div`.
- `activeStyle`: Style object applied when this `<Appear>` is active. Defaults to `{ opacity: 1 }`.
- `inactiveStyle`: Style object applied when this `<Appear>` is inactive. Defaults to `{ opacity: 0 }`.

## Code Pane

CodePane is a component for showing a syntax-highlighted block of source code. It will scroll for overflow amounts of code, trim whitespace and normalize indents. It will also wrap long lines of code and preserve the indent. CodePane uses the [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) Component.

The `theme` prop accepts a configurable object or pre-defined theme object from the available [Prism Themes](https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/src/styles/prism/index.js).

Additionally, the `highlightRanges` prop accepts an array that can be used to highlight certain ranges of code:

This array can contain a range of two numbers, where the first number indicates the _start_, and the second number the _end_ of that range, e.g.,

`[1, 3]` will highlight lines 1 through 3.

It can also contain a list of sub-arrays which will be considered as a list of ranges, e.g.,

`[[1, 3], [6, 8], [10, 15]]`.

Array values can even be mixed to include sub-arrays (for multiple lines) and numbers (for single lines), e.g.,

`[[1, 3], 5, [6, 8], [10, 15], 20]`.

_Note that each range will be considered as a step in your current slide's animation. Each range will be highlighted as you move forward or backwards on each step._

| Props                              | Type                                                                                          | Example                                                                                                                   | Default Props        |
| ---------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `children`                         | PropTypes.string                                                                              | `let name = "Carlos"`                                                                                                     | -                    |
| `highlightRanges`                  | PropTypes.arrayOf(PropTypes.number) or PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)) | `[1, 3]` or `[[6, 8], [10, 15]]`                                                                                          | -                    |
| `language`                         | PropTypes.string                                                                              | `javascript`                                                                                                              | -                    |
| `theme`                            | PropTypes.object or                                                                           | [Prism Theme](https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/src/styles/prism/index.js) | vs-dark Theme Object |
| `showLineNumbers`                  | PropTypes.bool                                                                                | `true`, `false`                                                                                                           | `true`               |
| [**`Layout`**](./props.md#layout)     |                                                                                               |                                                                                                                           |                      |
| [**`Position`**](./props.md#position) |                                                                                               |                                                                                                                           |                      |

```jsx
import tomorrow from 'react-syntax-highlighter/dist/cjs/styles/prism/tomorrow';

() => (
  <Slide>
    <CodePane language="javascript" theme={tomorrow} highlightRanges={[1, 3]}>
      {`
      const App = () => (
        <Provider value={client}>
          <Todos />
        </Provider>
      );
      `}
    </CodePane>
  </Slide>
);
```

## FullScreen

FullScreen is a button that takes the presentation in and out of the browser's full screen mode. It can have a different color and be re-sized.

| Props                              | Type             | Example   |
| ---------------------------------- | ---------------- | --------- |
| `size`                             | PropTypes.number | `23`      |
| `color`                            | PropTypes.string | `#abc123` |
| [**`Position`**](./props.md#position) |                  |           |

## Image

Image is a component to display a picture within a slide. It is analogous to an `<img>` tag and conforms to Layout and Position props.

| Props                              | Type             |
| ---------------------------------- | ---------------- |
| src                                | PropTypes.string |
| [**`Layout`**](./props.md#layout)     |                  |
| [**`Position`**](./props.md#position) |                  |

## Markdown Components

The Markdown components let you include a block of Markdown within a slide using `<Markdown />`, author a complete slide with Markdown using `<MarkdownSlide />`, or author a series of slides with Markdown using `<MarkdownSlides />`. Markdown tags get converted into Spectacle components. The `---` three dash marker when used inside `<MarkdownSlideSet />` is used to divide content into separate slides. Markdown also supports presenter notes using the `Notes:` marker. `<Markdown />` must be a child of `<Slide />` where `<MarkdownSlide />` and `<MarkdownSlideSet />` are children of `<Deck />`.

| Props                              | Type              | Example                                                                             |
| ---------------------------------- | ----------------- | ----------------------------------------------------------------------------------- |
| `children`                         | PropTypes.string  | `# Hi there`                                                                        |
| `componentProps`                   | PropTypes.object  | `<MarkdownSlide componentProps={{ color: 'purple' }}># I'm purple!</MarkdownSlide>` |
| `animateListItems`                 | PropTypes.boolean | `<MarkdownSlide animateListItems />`                                                |
| [**`Layout`**](./props.md#layout)     |                   |                                                                                     |
| [**`Position`**](./props.md#position) |                   |                                                                                     |

```jsx
<Slide>
  <Markdown>
    # Urql
    A highly customizable and versatile GraphQL client
  </Markdown>
  <Text>Made by Formidable</Text>
</Slide>
<MarkdownSlide animateListItems>
  # Use Markdown to write a slide

  This is a single slide composed using Markdown.

  - It uses the `animateListItems` prop so...
  - it's list items...
  - will animate in, one at a time.
</MarkdownSlide>
<MarkdownSlideSet>
  # Markdown Slide Sets

  Let you write a sequence of slides using Markdown.

  ---

  # This is the Second Slide in the Set

  Using the `---` delimiter creates a new slide in the set.

  Notes: The easiest way to always display up-to-date data is to set the requestPolicy to 'cache-and-network'.
</MarkdownSlideSet>
```

#### v7 Migration Guide

In prior versions of Spectacle the `<Markdown />` component was used for slides, set and markdown content. As noted above there are now three specific components for each of these use cases.

1. `<Slide><Markdown /></Slide>` remains the same.
2. `<Markdown />` when used for a full slide is now `<MarkdownSlide />`.
3. `<Markdown containsSlides />` is now `<MarkdownSlideSet />`.

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

Progress is a component with no children that just shows dots for each slide in your deck. The current slide is represented by a filled circle. Visited and future slides are represented by a transparent, outlined circle. The size and color are customizable.

| Props                              | Type             | Example   |
| ---------------------------------- | ---------------- | --------- |
| `size`                             | PropTypes.number | `23`      |
| `color`                            | PropTypes.string | `#abc123` |
| [**`Position`**](./props.md#position) |                  |           |

## AnimatedProgress

AnimatedProgress is similar to the Progress component, with an additional Pacman character that moves when the current slide changes. It looks like the Pacman is eating all of the circles that represent slides up to, and including, the new current slide. The size and color of the circles are customizable, as is the color of the Pacman.

| Props                              | Type             | Example   |
| ---------------------------------- | ---------------- | --------- |
| `size`                             | PropTypes.number | `23`      |
| `color`                            | PropTypes.string | `#abc123` |
| `pacmanColor`                      | PropTypes.string | `#abc123` |
| [**`Position`**](./props.md#position) |                  |           |

## SlideLayout

`SlideLayout` is a set of helper components used to create slides from a set of pre-defined layouts, so you can avoid dealing with things like layout primitives.

### `SlideLayout.Full`

A full-slide layout for if you need basic slide with nothing in your way.

| Props           | Type                  | Example |
|-----------------|-----------------------|---------|
| `...slideProps` | [Slide Props](#slide) |         |

### `SlideLayout.Center`

A centered-content layout for if you want to display your slide content as a piece of content centered on the slide.

| Props           | Type                  | Example |
|-----------------|-----------------------|---------|
| `...slideProps` | [Slide Props](#slide) |         |

### `SlideLayout.TwoColumn`

A two-column layout for if you want to easily split your slide content into two equal-sized columns.

| Props           | Type                  | Example                          |
|-----------------|-----------------------|----------------------------------|
| `...slideProps` | [Slide Props](#slide) |                                  |
| `left`          | `ReactNode`           | `<Heading>Hello world</Heading>` |
| `right`         | `ReactNode`           | `<Heading>Hello world</Heading>` |

### `SlideLayout.List`

A layout with a list and an optional title for if you want to quickly display a list of items.

| Props              | Type                                | Required | Example                         |
|--------------------|-------------------------------------|----------|---------------------------------|
| `...slideProps`    | [Slide Props](#slide)               | ❌        |                                 |
| `title`            | `string`                            | ❌        | `My list slide`                 |
| `titleProps`       | [Heading Props](./props.md/#typograph) | ❌        | `{ color: 'red' }`              |
| `items`            | `ReactNode[]`                       | ✅        | `['Hello', <Text>World</Text>]` |
| `animateListItems` | `boolean`                           | ❌        | `true`                          |
| `listProps`        | [List Props](#typography-tags)      | ❌        | `{ backgroundColor: 'purple' }` |


### `SlideLayout.Section`

A vertically-centered left-aligned section title layout for if you want title page for a new section.

| Props                  | Type                            | Required |  Example                 |
|------------------------|---------------------------------|----------|--------------------------|
| `...slideProps`        | [Slide Props](#slide)           | ❌        |                          |
| `sectionProps`         | [Text Props](#typography-tags)  | ❌        | { fontSize: "48px" }     |

### `SlideLayout.Statement`

A vertically-centered center-aligned statement for if you want to make a statement.

| Props                  | Type                            | Required |  Example                 |
|------------------------|---------------------------------|----------|--------------------------|
| `...slideProps`        | [Slide Props](#slide)           | ❌        |                          |
| `statementProps`       | [Text Props](#typography-tags)  | ❌        | { fontSize: "48px" }     |

### `SlideLayout.BigFact`

A centered Big Fact layout for if you want to present a fact in a large font.

| Props                  | Type                           | Required | Example               | Default |
|------------------------|--------------------------------|----------|-----------------------|---------|
| `children`             | `ReactNode`                    | ✅        | `100%`                |         |
| `...slideProps`        | [Slide Props](#slide)          | ❌        |                       |         |
| `factInformation`      | `ReactNode`                    | ❌        | `Fact information`    |         |
| `factProps`            | [Text Props](#typography-tags) | ❌        | { fontSize: "100px" } |         |
| `factInformationProps` | [Text Props](#typography-tags) | ❌        | { fontSize: "48px" }  |         |
| `factFontSize`         | `string`                       | ❌        | `150px`               | `250px` |

### `SlideLayout.Quote`

A vertically-centered Quote layout for if you want to present a quote and attribute it to someone.

| Props              | Type                           | Required | Example               |
|--------------------|--------------------------------|----------|-----------------------|
| `children`         | `ReactNode`                    | ✅        | `To be, or not to be` |
| `...slideProps`    | [Slide Props](#slide)          | ❌        |                       |
| `attribution`      | `ReactNode`                    | ✅        | `William Shakespeare` |
| `quoteProps`       | [Text Props](#typography-tags) | ❌        | { fontSize: "100px" } |
| `attributionProps` | [Text Props](#typography-tags) | ❌        | { fontSize: "48px" }  |

### `SlideLayout.Code`

A layout with a single code pane and an optional title for if you want one code block per slide.

| Props           | Type                              | Required | Example                                                          |
|-----------------|-----------------------------------|----------|------------------------------------------------------------------|
| `...slideProps` | [Slide Props](#slide)             | ❌        |                                                                  |
| `title`         | `string`                          | ❌        | `Show me the code!`                                              |
| `titleProps`    | [Heading Props](#typography-tags) | ❌        | `{ color: 'red' }`                                               |
| `children`      | `string`                          | ✅        | `const Component = (props: componentProps): JSX.Element = {...}` |
| `language`      | `boolean`                         | ✅        | `false`                                                          |
| `codePaneProps` | `CodePaneProps`                   | ❌        |                                                                  |

### `SlideLayout.MultiCodeLayout`

A layout with multiple code panes and optional descriptions, and an optional title for if you want more than one code block per slide or code with description text.

| Props           | Type                              | Required | Example                                                                                                             |
|-----------------|-----------------------------------|----------|---------------------------------------------------------------------------------------------------------------------|
| `...slideProps` | [Slide Props](#slide)             | ❌        |                                                                                                                     |
| `title`         | `string`                          | ❌        | `Show me the code!`                                                                                                 |
| `titleProps`    | [Heading Props](#typography-tags) | ❌        | `{ color: 'red' }`                                                                                                  |
| `numColumns`    | `number`                          | ❌        | `{2}`                                                                                                               |
| `codeBlocks`    | `CodeBlock[]`                     | ✅        | `[{ code: 'console.log("hello world!")', language: 'jsx', description: 'Say hello', codePaneProps: {...} }, {...}]` |

where

```ts
type CodeBlock = Omit<CodePaneProps, 'children'> & {
  code: CodePaneProps['children'];
  description?: string | ReactNode;
  descriptionProps?: ComponentProps<typeof Text>;
}
```
