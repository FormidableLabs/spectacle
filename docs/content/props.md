---
title: Base Props
order: 3
---

<a name="Color"></a>

# Color

| Name | PropType | Description | Example |
| --- | --- | --- | --- |
| `color` | PropTypes.string | Set CSS `color` value or `color` theme value | `#abc123` or `primary` |
| `bg` or `backgroundColor` | PropTypes.string | Set CSS `background-color` value or `color` theme value | `#abc123` or `secondary` |

<a name="Space"></a>

# Space

| Name | PropType | Description | Example |
| --- | --- | --- | --- |
| `m` or `margin` | PropTypes.string | Set CSS `margin` value or `space` theme value | `24px`, `6px 3px 2px`, or `primary` |
| `mt` or `marginTop` | PropTypes.string | Set CSS `margin-top` value or `space` theme value | `1em` or `tertiary` |
| `mr` or `marginRight` | PropTypes.string | Set CSS `margin-right` value or `space` theme value | `0.5em` or `secondary` |
| `mb` or `marginBottom` | PropTypes.string | Set CSS `margin-bottom` value or `space` theme value | `2px` or `primary` |
| `ml` or `marginLeft` | PropTypes.string | Set CSS `margin-left` value or `space` theme value | `3%` or `secondary` |
| `mx` or `marginX` | PropTypes.string | Set CSS `margin-left` and `margin-right` value or `space` theme value | `1em` or `secondary` |
| `my` or `marginY` | PropTypes.string | Set CSS `margin-top` and `margin-bottom` value or `space` theme value | `5px` or `tertiary` |
| `p` or `padding` | PropTypes.string | Set CSS `padding` value or `space` theme value | `24px`, `6px 3px 2px`, or `primary` |
| `pt` or `paddingTop` | PropTypes.string | Set CSS `padding-top` value or `space` theme value | `1em` or `tertiary` |
| `pr` or `paddingRight` | PropTypes.string | Set CSS `padding-right` value or `space` theme value | `0.5em` or `secondary` |
| `pb` or `paddingBottom` | PropTypes.string | Set CSS `padding-bottom` value or `space` theme value | `2px` or `primary` |
| `pl` or `paddingLeft` | PropTypes.string | Set CSS `padding-left` value or `space` theme value | `3%` or `secondary` |
| `px` or `paddingX` | PropTypes.string | Set CSS `padding-left` and `padding-right` value or `space` theme value | `1em` or `secondary` |
| `py` or `paddingY` | PropTypes.string | Set CSS `padding-top` and `padding-bottom` value or `space` theme value | `5px` or `tertiary` |

<a name="Typography"></a>

# Typography

| Name | PropType | Description | Example |
| --- | --- | --- | --- |
| `fontFamily` | PropTypes.string | Set CSS `font-family` value or `fonts` theme value | `Helvetica` or `primary` |
| `fontSize` | PropTypes.string | Set CSS `font-size` value or `fontSizes` theme value | `16px` or `bodyCopy` |
| `fontWeight` | PropTypes.string | Set CSS `font-weight` value or `fontWeights` theme value | `400`, `bold`, or `heading` |
| `lineHeight` | PropTypes.string | Set CSS `line-height` value or `fontWeights` theme value | `1.5em` or `paragraph` |
| `letterSpacing` | PropTypes.string | Set CSS `letter-spacing` value or `letterSpacings` theme value | `1px` or `spreadOutText` |
| `textAlign` | PropTypes.string | Set CSS `text-align` value | `left` |
| `fontStyle` | PropTypes.string | Set CSS `font-style` value | `normal` or `italic` |

<a name="Layout"></a>

# Layout

| Name | PropType | Description | Example |
| --- | --- | --- | --- |
| `width` | PropTypes.string or PropTypes.number | Set CSS `width` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `height` | PropTypes.string or PropTypes.number | Set CSS `height` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `minWidth` | PropTypes.string or PropTypes.number | Set CSS `min-width` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `maxWidth` | PropTypes.string or PropTypes.number | Set CSS `max-width` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `minHeight` | PropTypes.string or PropTypes.number | Set CSS `min-height` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `maxHeight` | PropTypes.string or PropTypes.number | Set CSS `max-height` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `size` | PropTypes.string or PropTypes.number | Set CSS `width` and `height` value or `sizes` theme value, fractional numeric values get converted to precents, for example `1/2` becomes `50%`, whole numbers get converted into pixels | `100%`, `1/2`, `30px`, `256`, or `primary` |
| `display` | PropTypes.string | Set CSS `display` value | `inline-block` |
| `overflow` | PropTypes.string | Set CSS `overflow` value | `visible` |
| `overflowX` | PropTypes.string | Set CSS `overflow-x` value | `hidden` |
| `overflowY` | PropTypes.string | Set CSS `overflow-y` value | `visible` |
