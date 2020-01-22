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
