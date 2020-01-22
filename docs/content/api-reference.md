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

| Props    | Type                        | Example |
| -------- | --------------------------- | ------- |
| theme    | [Custom Theme Object](TODO) | `TODO`  |
| template | [Layout Render Prop](TODO)  | `TODO`  |

<a name="slide"></a>

### Slide

Wraps a single slide within your presentation; identifies what is contained to a single view.

No props need to be directly passed to this tag as the `Deck` and semantic tags within the `Slide` should handle most of your layout and themeing, but should you need to override those presentation-wide props, you can pass a theme or template object directly into the `Slide`.

<a name="semantic-tags"></a>

## Semantic Tags

The use of a semantic tag should be clear by its name. Semantic Tags are elements whose name describes its semantic use, i.e. a `Heading` is equal to an HTML `h`eader tag.

| Tag Name                    | Accepts Props? | Example                                                                                                                   |
| --------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [CodePane](#CodePane)       | Y              | ``                                                                                                                        |
| [CodeSpan](#CodeSpan)       | Y              | ``                                                                                                                        |
| [Heading](#Heading)         | Y              | `<Heading color="secondary" fontSize="h2">A Secondary Heading</Heading>`                                                  |
| [Image](#Image)             | Y              | `<Image src={FormidaLogo} width="250px" />`                                                                               |
| [ListItem](#ListItem)       | Y              | `<OrderedList><ListItem color="primary">item uno</ListItem><ListItem color="secondary">item dos</ListItem></OrderedList>` |
| [Markdown](#Markdown)       | N              | ``                                                                                                                        |
| [Notes](#Notes)             | N              | `<Notes><ul><li>Notes are kept as children</li><li><i>and</i> you can still use HTML</li></ul></Notes>`                   |
| [OrderedList](#OrderedList) | ??             | ``                                                                                                                        |
| [Text](#Text)               | Y              | `<Text>a little sample of text</Text>`                                                                                    |

<a name="codepane"></a>

### CodePane

Displays a block of code in a designated language.

| Prop           | Type    |
| -------------- | ------- |
| autoFillHeight | Boolean |
| fontSize       | Number  |
| language\*     | String  |

\*: Required

<a name="codespan"></a>

### CodeSpan

Wraps a line of text in monospaced font.

<a name="heading"></a>

### Heading

Represents an `h` tag within your presentation. It accepts a variety of props.

| Props    | Type   | Example                     |
| -------- | ------ | --------------------------- |
| color    | String | `"primary", "#HEXCODETODO"` |
| fontSize | String | `"h2", "350px"`             |

<a name="image"></a>

### Image

| Props  | Type               |
| ------ | ------------------ |
| src\*  | String             |
| height | `Number || String` |
| width  | `Number || String` |

\*: Required

<a name="listitem"></a>

### ListItem

Wrapped by [`OrderedList`](#OrderedList) and either receives alignment, color, and size props from its parent, or those can be provided to the element directly.

| Prop     | Type               |
| -------- | ------------------ |
| align    | String             |
| color    | String             |
| fontSize | `Number || String` |

<a name="markdown"></a>

### Markdown

<a name="notes"></a>

### Notes

Allows a user to write notes to their future selves inside of a specific `Slide`, visible when [Presenter Mode](./basic-concepts.md#presenting) is in use.

<a name="orderedlist"></a>

### OrderedList

Wraps [`ListItem](#ListItem)[s] and supplies alignment, color, and fontSize logic to its nested children.

| Prop     | Type               |
| -------- | ------------------ |
| align    | String             |
| color    | String             |
| fontSize | `Number || String` |

<a name="text"></a>

### Text

<a name="style-tags"></a>

## Style Tags

Style Tags exist to aid the styling of either `Deck` templates or specific `Slide`s. Some are decorative and can be sprinkled throughout your presentation, others are overarching choices you will make about your slideshow and how you would like to present it.

<a name="appear"></a>

### Appear

<a name="box"></a>

### Box

<a name="flexbox"></a>

### FlexBox

<a name="fullscreen"></a>

### FullScreen

<a name="grid"></a>

### Grid

<a name="progress"></a>

### Progress

Meant to serve as a callback to the origin Pacman-style progress bar from "Original Spectacle" (anything pre-v6). Add it to your presentation to give your audience a visual of progress throughout your presentation.

```javascript
// index.js
// TODO - i'm sure this is wrong
<Deck>
  <Progress />
</Deck>
```

![A screenshot of Progress in use](TODO)
