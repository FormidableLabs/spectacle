---
title: Base Props
order: 3
---

<a name="base-props"></a>

# Base Props

The following are a handful of standard base props many components consume. For a complete list of available components and the props they consume, please see our complete [API Reference](/docs/api-reference).

<a name="transition-object"></a>

## Transition Object

A transition object defines the animatable CSS properties for three states: `from`, `enter`, and `leave`. From is the starting transition. Enter are the styles applied when the slide is in view. Leave are the styles when the slide goes out of view.

An example transition object looks like:

```javascript
const transition = {
  from: {
    position: 'fixed',
    transform: 'translate(100%, 0%)'
  },
  enter: {
    position: 'fixed',
    transform: 'translate(0, 0%)'
  },
  leave: {
    position: 'fixed',
    transform: 'translate(-100%, 0%)'
  }
};
```

<a name="color"></a>

## Color

**Color** props are used by [`CodeSpan`](/docs/api-reference#code-span), [`Text`](/docs/api-reference#text), [`Link`](/docs/api-reference#link), [`Heading`](/docs/api-reference#heading), [`Quote`](/docs/api-reference#quote), [`Table`](/docs/api-reference#table), [`TableHeader`](/docs/api-reference#table-header), [`TableBody`](/docs/api-reference#table-body), [`TableRow`](/docs/api-reference#table-row), [`TableCell`](/docs/api-reference#table-cell), [`UnorderedList`](/docs/api-reference#unordered-list), [`OrderedList`](/docs/api-reference#ordered-list), and [`ListItem`](/docs/api-reference#list-item).

| Name                      | PropType         | Description                                             | Example                  |
| ------------------------- | ---------------- | ------------------------------------------------------- | ------------------------ |
| `color`                   | PropTypes.string | Set CSS `color` value or `color` theme value            | `#abc123` or `primary`   |
| `bg` or `backgroundColor` | PropTypes.string | Set CSS `background-color` value or `color` theme value | `#abc123` or `secondary` |

<a name="space"></a>

## Space

**Space** props used by [`Box`](/docs/api-reference#box), [`FlexBox`](/docs/api-reference#flex-box), [`Grid`](/docs/api-reference#grid), [`CodeSpan`](/docs/api-reference#code-span), [`Text`](/docs/api-reference#text), [`Link`](/docs/api-reference#link), [`Heading`](/docs/api-reference#heading), [`Quote`](/docs/api-reference#quote), [`Table`](/docs/api-reference#table), [`TableHeader`](/docs/api-reference#table-header), [`TableBody`](/docs/api-reference#table-body), [`TableRow`](/docs/api-reference#table-row), [`TableCell`](/docs/api-reference#table-cell), [`UnorderedList`](/docs/api-reference#unordered-list), [`OrderedList`](/docs/api-reference#ordered-list), and [`ListItem`](/docs/api-reference#list-item).

| Name                    | PropType         | Description                                                             | Example                             |
| ----------------------- | ---------------- | ----------------------------------------------------------------------- | ----------------------------------- |
| `m` or `margin`         | PropTypes.string | Set CSS `margin` value or `space` theme value                           | `24px`, `6px 3px 2px`, or `primary` |
| `mt` or `marginTop`     | PropTypes.string | Set CSS `margin-top` value or `space` theme value                       | `1em` or `tertiary`                 |
| `mr` or `marginRight`   | PropTypes.string | Set CSS `margin-right` value or `space` theme value                     | `0.5em` or `secondary`              |
| `mb` or `marginBottom`  | PropTypes.string | Set CSS `margin-bottom` value or `space` theme value                    | `2px` or `primary`                  |
| `ml` or `marginLeft`    | PropTypes.string | Set CSS `margin-left` value or `space` theme value                      | `3%` or `secondary`                 |
| `mx` or `marginX`       | PropTypes.string | Set CSS `margin-left` and `margin-right` value or `space` theme value   | `1em` or `secondary`                |
| `my` or `marginY`       | PropTypes.string | Set CSS `margin-top` and `margin-bottom` value or `space` theme value   | `5px` or `tertiary`                 |
| `p` or `padding`        | PropTypes.string | Set CSS `padding` value or `space` theme value                          | `24px`, `6px 3px 2px`, or `primary` |
| `pt` or `paddingTop`    | PropTypes.string | Set CSS `padding-top` value or `space` theme value                      | `1em` or `tertiary`                 |
| `pr` or `paddingRight`  | PropTypes.string | Set CSS `padding-right` value or `space` theme value                    | `0.5em` or `secondary`              |
| `pb` or `paddingBottom` | PropTypes.string | Set CSS `padding-bottom` value or `space` theme value                   | `2px` or `primary`                  |
| `pl` or `paddingLeft`   | PropTypes.string | Set CSS `padding-left` value or `space` theme value                     | `3%` or `secondary`                 |
| `px` or `paddingX`      | PropTypes.string | Set CSS `padding-left` and `padding-right` value or `space` theme value | `1em` or `secondary`                |
| `py` or `paddingY`      | PropTypes.string | Set CSS `padding-top` and `padding-bottom` value or `space` theme value | `5px` or `tertiary`                 |

<a name="typography"></a>

## Typography

**Typography** props are used by [`CodeSpan`](/docs/api-reference#code-span), [`Text`](/docs/api-reference#text), [`Link`](/docs/api-reference#link), [`Heading`](/docs/api-reference#heading), [`Quote`](/docs/api-reference#quote), [`Table`](/docs/api-reference#table), [`TableHeader`](/docs/api-reference#table-header), [`TableBody`](/docs/api-reference#table-body), [`TableRow`](/docs/api-reference#table-row), [`TableCell`](/docs/api-reference#table-cell), [`UnorderedList`](/docs/api-reference#unordered-list), [`OrderedList`](/docs/api-reference#ordered-list), and [`ListItem`](/docs/api-reference#list-item).

| Name            | PropType         | Description                                                    | Example                                                    |
| --------------- | ---------------- | -------------------------------------------------------------- | ---------------------------------------------------------- |
| `fontFamily`    | PropTypes.string | Set CSS `font-family` value or `fonts` theme value             | `Helvetica` or `primary`                                   |
| `fontSize`      | PropTypes.string | Set CSS `font-size` value or `fontSizes` theme value           | `16px` or `bodyCopy`                                       |
| `fontWeight`    | PropTypes.string | Set CSS `font-weight` value or `fontWeights` theme value       | `400`, `bold`, or [`Heading`](/docs/api-reference#heading) |
| `lineHeight`    | PropTypes.string | Set CSS `line-height` value or `fontWeights` theme value       | `1.5em` or `paragraph`                                     |
| `letterSpacing` | PropTypes.string | Set CSS `letter-spacing` value or `letterSpacings` theme value | `1px` or `spreadOutText`                                   |
| `textAlign`     | PropTypes.string | Set CSS `text-align` value                                     | `left`                                                     |
| `fontStyle`     | PropTypes.string | Set CSS `font-style` value                                     | `normal` or `italic`                                       |

<a name="layout"></a>

## Layout

**Layout** props are used by [`Box`](/docs/api-reference#box), [`FlexBox`](/docs/api-reference#flex-box), [`Grid`](/docs/api-reference#grid), [`Table`](/docs/api-reference#table), [`TableHeader`](/docs/api-reference#table-header), [`TableBody`](/docs/api-reference#table-body), [`TableRow`](/docs/api-reference#table-row), and [`TableCell`](/docs/api-reference#table-cell).

| Name        | PropType                             | Description                                                                                                                                                                              | Example                                    |
| ----------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `width`     | PropTypes.string or PropTypes.number | Set CSS `width` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels              | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `height`    | PropTypes.string or PropTypes.number | Set CSS `height` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels             | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `minWidth`  | PropTypes.string or PropTypes.number | Set CSS `min-width` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels          | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `maxWidth`  | PropTypes.string or PropTypes.number | Set CSS `max-width` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels          | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `minHeight` | PropTypes.string or PropTypes.number | Set CSS `min-height` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels         | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `maxHeight` | PropTypes.string or PropTypes.number | Set CSS `max-height` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels         | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `size`      | PropTypes.string or PropTypes.number | Set CSS `width` and `height` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `display`   | PropTypes.string                     | Set CSS `display` value                                                                                                                                                                  | `inline-block`                             |
| `overflow`  | PropTypes.string                     | Set CSS `overflow` value                                                                                                                                                                 | `visible`                                  |
| `overflowX` | PropTypes.string                     | Set CSS `overflow-x` value                                                                                                                                                               | `hidden`                                   |
| `overflowY` | PropTypes.string                     | Set CSS `overflow-y` value                                                                                                                                                               | `visible`                                  |

<a name="flex"></a>

## Flex

**Flex** props are used by [`FlexBox`](/docs/api-reference#flex-box).

| Name             | PropType                             | Description                     | Example         |
| ---------------- | ------------------------------------ | ------------------------------- | --------------- |
| `alignItems`     | PropTypes.string                     | Set CSS `align-items` value     | `flex-start`    |
| `alignContent`   | PropTypes.string                     | Set CSS `align-content` value   | `center`        |
| `justifyContent` | PropTypes.string                     | Set CSS `justify-content` value | `space-between` |
| `flexWrap`       | PropTypes.string                     | Set CSS `flex-wrap` value       | `wrap`          |
| `flexBasis`      | PropTypes.string or PropTypes.number | Set CSS `flex-basis` value      | `auto` or `1`   |
| `flexDirection`  | PropTypes.string                     | Set CSS `flex-direction` value  | `column`        |
| `flex`           | PropTypes.string                     | Set CSS `flex` value            | `1 1 auto`      |
| `justifySelf`    | PropTypes.string                     | Set CSS `justify-self` value    | `stretch`       |
| `alignSelf`      | PropTypes.string                     | Set CSS `align-self` value      | `center`        |
| `order`          | PropTypes.number                     | Set CSS `order` value           | `1`             |

<a name="grid"></a>

## Grid

**Grid** props are used by [`Grid`](/docs/api-reference#grid).

| Name                  | PropType                             | Description                           | Example                                       |
| --------------------- | ------------------------------------ | ------------------------------------- | --------------------------------------------- |
| `gridGap`             | PropTypes.number                     | Set CSS `grid-gap` value              | `15`                                          |
| `gridColumnGap`       | PropTypes.number                     | Set CSS `grid-column-gap` value       | `3`                                           |
| `gridRowGap`          | PropTypes.number                     | Set CSS `grid-row-gap` value          | `6`                                           |
| `gridColumn`          | PropTypes.number or PropTypes.string | Set CSS `grid-column` value           | `auto`, `1 / 2`, or `3`                       |
| `gridRow`             | PropTypes.number or PropTypes.string | Set CSS `grid-row` value              | `auto`, `1 / 2`, or `3`                       |
| `gridAutoFlow`        | PropTypes.string                     | Set CSS `grid-auto-flow` value        | `row` or `column-dense`                       |
| `gridAutoColumns`     | PropTypes.string                     | Set CSS `grid-auto-columns` value     | `min-content`, `1fr`, or `minmax(10px, auto)` |
| `gridAutoRows`        | PropTypes.string                     | Set CSS `grid-auto-rows` value        | `min-content`, `1fr`, or `minmax(10px, auto)` |
| `gridTemplateColumns` | PropTypes.string                     | Set CSS `grid-template-columns` value | `60px 60px` or `1fr 2fr`                      |
| `gridTemplateRows`    | PropTypes.string                     | Set CSS `grid-template-rows` value    | `40px 1fr` or `8ch auto`                      |
| `gridTemplateAreas`   | PropTypes.string                     | Set CSS `grid-template-area` value    | `a b` or `inherit`                            |
| `gridArea`            | PropTypes.string                     | Set CSS `grid-area` value             | `a` or `2 / 1 / 4`                            |

<a name="position"></a>

## Position

**Position** props are used by [`Box`](/docs/api-reference#box), [`FlexBox`](/docs/api-reference#flex-box), and [`Grid`](/docs/api-reference#grid).

| Name       | PropType         | Description              | Example    |
| ---------- | ---------------- | ------------------------ | ---------- |
| `position` | PropTypes.string | Set CSS `position` value | `relative` |
| `zIndex`   | PropTypes.number | Set CSS `z-index` value  | `2`        |
| `top`      | PropTypes.number | Set CSS `top` value      | `1`        |
| `right`    | PropTypes.number | Set CSS `right` value    | `3`        |
| `bottom`   | PropTypes.number | Set CSS `bottom` value   | `10`       |
| `left`     | PropTypes.number | Set CSS `left` value     | `5`        |

<a name="border"></a>

## Border

**Border** props are used by [`Box`](/docs/api-reference#box), [`FlexBox`](/docs/api-reference#flex-box), [`Grid`](/docs/api-reference#grid), [`Table`](/docs/api-reference#table), [`TableHeader`](/docs/api-reference#table-header), [`TableBody`](/docs/api-reference#table-body), [`TableRow`](/docs/api-reference#table-row), and [`TableCell`](/docs/api-reference#table-cell).

| Name                      | PropType                             | Description                                    | Example              |
| ------------------------- | ------------------------------------ | ---------------------------------------------- | -------------------- |
| `border`                  | PropTypes.string                     | Set CSS `position` value                       | `2px solid white`    |
| `borderWidth`             | PropTypes.number or PropTypes.string | Set CSS `border-width` value                   | `5px`                |
| `borderStyle`             | PropTypes.string                     | Set CSS `border-style` value                   | `solid`              |
| `borderColor`             | PropTypes.string                     | Set CSS `border-color` value                   | `rgb(255, 200, 150)` |
| `borderRadius`            | PropTypes.number or PropTypes.string | Set CSS `border-radius` value                  | `10`                 |
| `borderTop`               | PropTypes.string                     | Set CSS `border-top` value                     | `3px dashed #000`    |
| `borderTopWidth`          | PropTypes.number or PropTypes.string | Set CSS `border-top-width` value               | `1`                  |
| `borderTopStyle`          | PropTypes.string                     | Set CSS `border-top-style` value               | `solid`              |
| `borderTopColor`          | PropTypes.string                     | Set CSS `border-top-color` value               | `#ff0abc`            |
| `borderTopLeftRadius`     | PropTypes.number or PropTypes.string | Set CSS `border-top-left-radius` value         | `20%`                |
| `borderTopRightRadius`    | PropTypes.number or PropTypes.string | Set CSS `border-top-right-radius` value        | `4px`                |
| `borderRight`             | PropTypes.string                     | Set CSS `border-right` value                   | `relative`           |
| `borderRightWidth`        | PropTypes.number or PropTypes.string | Set CSS `border-right-width` value             | `1px`                |
| `borderRightStyle`        | PropTypes.string                     | Set CSS `border-right-style` value             | `solid`              |
| `borderRightColor`        | PropTypes.string                     | Set CSS `border-right-color` value             | `red`                |
| `borderBottom`            | PropTypes.string                     | Set CSS `border-bottom` value                  | `2px solid blue`     |
| `borderBottomWidth`       | PropTypes.number or PropTypes.string | Set CSS `border-bottom-width` value            | `1em`                |
| `borderBottomStyle`       | PropTypes.string                     | Set CSS `border-bottom-style` value            | `dashed`             |
| `borderBottomColor`       | PropTypes.string                     | Set CSS `border-bottom-color` value            | `orange`             |
| `borderBottomLeftRadius`  | PropTypes.number or PropTypes.string | Set CSS `border-bottom-left-radius` value      | `2px`                |
| `borderBottomRightRadius` | PropTypes.number or PropTypes.string | Set CSS `border-bottom-right-radius` value     | `4px`                |
| `borderLeft`              | PropTypes.string                     | Set CSS `border-left` value                    | `1px solid green`    |
| `borderLeftWidth`         | PropTypes.number or PropTypes.string | Set CSS `border-left-width` value              | `2px`                |
| `borderLeftStyle`         | PropTypes.string                     | Set CSS `border-left-style` value              | `solid`              |
| `borderLeftColor`         | PropTypes.string                     | Set CSS `border-left-color` value              | `green`              |
| `borderX`                 | PropTypes.string                     | Set CSS `border-left` and `border-right` value | `2px dotted red`     |
| `borderY`                 | PropTypes.string                     | Set CSS `border-top` and `border-bottom` value | `1px solid black`    |
