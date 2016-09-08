<a name="tag-api"></a>
# Tag API

In Spectacle, presentations are composed of a set of base tags. We can separate these into three categories: Main tags, Layout tags & Element tags.

<a name="main-tags"></a>
## Main Tags

<a name="spectacle"></a>
### Spectacle

The Spectacle tag is the root level tag for your presentation. It handles routing, flux and generally presenting your Deck & Slides. It supports the following props:

|Name|PropType|Description|
|---|---|---|
|history|React.PropTypes.object|Accepts custom configuration for [history](https://github.com/ReactTraining/history)
|theme|React.PropTypes.object|Accepts a theme object for styling your presentation|

<a name="deck"></a>
### Deck

The deck tag wraps your slides. It supports the following props:

|Name|PropType|Description|
|---|---|---|
|transition|React.PropTypes.array|Accepts `slide`, `zoom`, `fade` or `spin`, and can be combined. Sets global slide transitions. **Note: If you use the 'scale' transition, fitted text won't work in Safari.**|
|transitionDuration| React.PropTypes.number| Accepts integer value in milliseconds for global transition duration.
|progress| React.PropTypes.string|Accepts `pacman`, `bar`, `number` or `none`.
|controls| React.PropTypes.bool| Show control arrows when not in fullscreen

<a name="slide-base"></a>
### Slide (Base)

The slide tag represents each slide in the presentation. Giving a slide tag an `id` attribute will replace its number based navigation hash with the `id` provided. It supports the following props, in addition to any of the props outlined in the Base class props listing:

|Name|PropType|Description|
|---|---|---|
|align| React.PropTypes.string | Accepts a space delimited value for positioning interior content. The first value can be `flex-start` (left), `center` (middle), or `flex-end` (bottom). The second value can be `flex-start` (top) , `center` (middle), or `flex-end` (bottom). You would provide this prop like `align="center center"`, which is its default.
|transition|React.PropTypes.array|Accepts `slide`, `zoom`, `fade` or `spin`, and can be combined. Sets the slide transition. **Note: If you use the 'scale' transition, fitted text won't work in Safari.**|
|transitionDuration| React.PropTypes.number| Accepts integer value in milliseconds for slide transition duration.
|notes| React.PropTypes.string| Text which will appear in the presenter mode. Can be HTML.
|id| React.PropTypes.string | Used to create a string based hash.

<a name="layout-tags"></a>
## Layout Tags

Layout tags are used for layout using Flexbox within your slide. They are `Layout`, `Fit` & `Fill`.

<a name="layout"></a>
### Layout

The layout tag is used to wrap `Fit` and `Fill` tags to provide a row.

<a name="fit"></a>
### Fit

The fit tag only takes up as much space as its bounds provide.

<a name="fill"></a>
### Fill

The fill tag takes up all the space available to it. For example, if you have a `Fill` tag next to a `Fit` tag, the `Fill` tag will take up the rest of the space. Adjacent `Fill` tags split the difference and form an equidistant grid.

<a name="markdown-tag"></a>
## Markdown Tag

<a name="markdown"></a>
### Markdown

The Markdown tag is used to add inline markdown to your slide. You can provide markdown source via the `source` prop, or as children. You can also provide a custom [mdast configuration](https://github.com/wooorm/mdast) via the `mdastConfig` prop.

Markdown generated tags aren't prop configurable, and instead render with your theme defaults.

|Name|PropType|Description|
|---|---|---|
|source|React.PropTypes.string| Markdown source |
|mdastConfig| React.PropTypes.object | Mdast configuration object |

<a name="element-tags"></a>
## Element Tags

The element tags are the bread and butter of your slide content. Most of these tags derive their props from the Base class, but the ones that have special options will have them listed:

<a name="appear"></a>
### Appear

This tag does not extend from Base. It's special. Wrapping elements in the appear tag makes them appear/disappear in order in response to navigation.

<a name="blockquote-quote-and-cite-base"></a>
### BlockQuote, Quote and Cite (Base)

These tags create a styled blockquote. Use them as follows:

```jsx
<BlockQuote>
  <Quote>Ken Wheeler is amazing</Quote>
  <Cite>Everyone</Cite>
</BlockQuote>
```

<a name="codepane-base"></a>
### CodePane (Base)

This tag displays a styled, highlighted code preview. I prefer putting my code samples in external `.example` files and requiring them using `raw-loader` as shown in the demo. Here are the props:

|Name|PropType|Description|
|---|---|---|
|lang|React.PropTypes.string| Prism compatible language name. i.e: 'javascript' |
|source| React.PropTypes.string| String of code to be shown |

You can change your syntax highlighting theme by swapping the prism.js CSS file in `index.html`

<a name="code-base"></a>
### Code (Base)

A simple tag for wrapping inline text that you want lightly styled in a monospace font.

<a name="heading-base"></a>
### Heading (Base)

Heading tags are special in that, when you specify a `size` prop, they generate the appropriate heading tag, and extend themselves with a style that is defined in the theme file for that heading. Line height can be adjusted via a numeric `lineHeight` prop.

|Name|PropType|Description|
|---|---|---|
|fit|React.PropTypes.boolean| When set to true, fits text to the slide's width. **Note: If you use the 'scale' transition, this won't work in Safari.** |
|lineHeight|React.PropTypes.number| Sets the line height of your text.|

<a name="image-base"></a>
### Image (Base)

|Name|PropType|Description|
|---|---|---|
|display|React.PropTypes.string| Set the display style property of the image |
|height|React.PropTypes.string or React.PropTypes.number| Supply a height to the image |
|src|React.PropTypes.string| Image src |
|width|React.PropTypes.string or React.PropTypes.number| Supply a width to the image |

<a name="link-base"></a>
### Link (Base)

The link tag is used to render `<a>` tags. It accepts an `href` prop:

|Name|PropType|Description|
|---|---|---|
|href|React.PropTypes.string| String of url for `href` attribute |
|target|React.PropTypes.string| Set the `target` attribute |

<a name="list--listitem-base"></a>
### List & ListItem (Base)

These tags create lists. Use them as follows:

```jsx
<List>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
  <ListItem>Item 4</ListItem>
</List>
```

<a name="s-base"></a>
### S (Base)

The `S` tag is used to add inline styling to a piece of text, such as underline or strikethrough.

|Name|PropType|Description|
|---|---|---|
|type|React.PropTypes.string| Accepts `strikethrough`, `underline`, `bold` or `italic`|

<a name="table-tablerow-tableheaderitem-and-tableitem-base"></a>
### Table, TableRow, TableHeaderItem and TableItem (Base)

The `Table` tag is used to add table to your slide. It is used with `TableRow`, `TableHeaderItem` and `TableItem`. Use them as follows:

```jsx
<Table>
  <TableRow>
    <TableHeaderItem></TableHeaderItem>
    <TableHeaderItem>2011</TableHeaderItem>
  </TableRow>
  <TableRow>
    <TableItem>None</TableItem>
    <TableItem>61.8%</TableItem>
  </TableRow>
  <TableRow>
    <TableItem>jQuery</TableItem>
    <TableItem>28.3%</TableItem>
  </TableRow>
</Table>
```

<a name="text-base"></a>
### Text (Base)

The `Text` tag is used to add text to your slide. Line height can be adjusted via a numeric `lineHeight` prop.

|Name|PropType|Description|
|---|---|---|
|fit|React.PropTypes.boolean| When set to true, fits text to the slide's width. **Note: If you use the 'scale' transition, this won't work in Safari.** |
|lineHeight|React.PropTypes.number| Sets the line height of your text.|
