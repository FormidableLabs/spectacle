---
title: Themes
order: 4
---

<a name="theme-system"></a>

# Theme System

Spectacle has a robust theme system that is built upon [styled system](https://styled-system.com/theme-specification).

A theme is a 2-level deep object of labeled theme keys and CSS property object values, which is passed directly to the `Deck` component.

## Theme Object

The following is an example of a simple custom theme object:

```js
const theme = {
  colors: {
    primary: '#f00',
    secondary: '#00f'
  },
  fontSizes: {
    header: '64px',
    paragraph: '28px'
  }
};
```

## Usage

Components in Spectacle can accept either a value label such as `primary` or a raw CSS value like `#f00`.
The label `primary` returns `#f00` since the `backgroundColor` prop (CSS property `background-color`) is mapped to the `colors` theme key.

```jsx
<Box backgroundColor="primary" />
<Box backgroundColor="#f00" />
```

<a name="theme-keys-css-props"></a>

## Theme Keys

Common CSS properties are divided into theme keys, which you can override in your custom theme object:

| Theme Key        | CSS Properties                                                          |
| ---------------- | ----------------------------------------------------------------------- |
| `space`          | `margin`, `padding`, `grid-gap`                                         |
| `colors`         | `color`, `background-color`, `border-color`                             |
| `sizes`          | `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height` |
| `fontSizes`      | `font-size`                                                             |
| `borders`        | `border`, `border-top`, `border-right`, `border-bottom`, `border-left`  |
| `borderWidths`   | `border-width`                                                          |
| `borderStyles`   | `border-style`                                                          |
| `radii`          | `border-radius`                                                         |
| `fonts`          | `font-family`                                                           |
| `fontWeights`    | `font-weight`                                                           |
| `lineHeights`    | `line-height`                                                           |
| `letterSpacings` | `letter-spacing`                                                        |
| `shadows`        | `box-shadow`, `text-shadow`                                             |
| `zIndices`       | `z-index`                                                               |

<a name="scaled-spacing"></a>

## Scaled Spacing

The `space` key is used as a scale for margins, paddings, and gaps for grids. It is an array of integer values. This allows for a more consistent scale of sizes throughout your presentation. The default theme uses three values on the scale, `16`, `24`, and `32`.

Given the following theme:

```jsx
let theme = {
  space: [16, 24, 32]
};
```

One can use a scale value by passing the index of the value as a numeric prop to any space theme property (such as `padding` or `margin`), like so:

```jsx
<Text padding={2}>Hello World</Text>
```

### Default Margin Assignments

Spectacle components use different values on the space scale as defaults for margins. The values can be overridden in your theme by providing alternative values as part of a space array that is at least 3 values deep. If no value is provided, Spectacle will default to `0`. Individual margin values can be also provided as `margin` props to the component.

| Component       | Default Space Index | Default Theme Value |
| --------------- | ------------------- | ------------------- |
| `Slide`         | `2`                 | `32px`              |
| `Heading`       | `1`                 | `24px`              |
| `Text`          | `0`                 | `16px`              |
| `OrderedList`   | `0`                 | `16px`              |
| `UnorderedList` | `0`                 | `16px`              |
| `ListItem`      | `0`                 | `16px`              |
| `Link`          | `0`                 | `16px`              |
| `Quote`         | `0`                 | `16px`              |
| `CodeSpan`      | `0`                 | `16px`              |
