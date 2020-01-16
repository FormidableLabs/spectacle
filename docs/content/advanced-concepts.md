---
title: Advanced Concepts
order: 2
---

<a name="advanced-concepts"></a>

# Advanced Concepts

<a name="themes"></a>

## Themes

Themeing is done using a [styled-system](https://styled-system.com/) theme object which is passed to the `Deck` component.

Spectacle will then merge your theme with the default theme (keys overriden will be replaced by user-defined theme).

The `Deck` provides the ThemeContext so the user's only concern is with writing the theme.

You can import theme properties using the styled-system [style functions](https://styled-system.com/getting-started#create-a-component).

If you need to extend layout components, you can use the [extends API](https://www.styled-components.com/docs/basics#extending-styles) from styled-components.

```js
// If for example we wanted to style a div with our theme:

// Example theme object:
const theme = {
  colors: {
    primary: 'red',
    secondary: 'black',
    tertiary: 'orange',
    quaternary: 'pink',ƒ
  }
};

// In our component:

import styled from 'styled-components'
import { color } from 'styled-system'

const SlideElement = styled.div`
  ${color}
`

<SlideElement color="primary" bg="secondary">
  Tomato
</SlideElement>

export default SlideElement

// We would have a Box component with red text and black background.
```

<a name="slide-templates"></a>

## Slide Templates

<a name="build--deployment"></a>

## Build & Deployment

There are a variety of ways to host your Spectacle presentation. Our preferred path is TODO, but there are two others we will also cover.

<a name="deploying-with-gh-pages"></a>

### Deploying with [`gh-pages`](TODO)

<a name="deploying-with-surge"></a>

### [`surge`](TODO)

<a name="deploying-with-now"></a>

### [`now`](TODO)

<a name="keyboard-controls"></a>

## Keyboard Controls

<!-- TODO - check out use-keyboard-controls -->

<a name="query-parameters"></a>

## Query Parameters

A handful of query parameters are supported within your Spectacle presentation

| Parameter             | Description of Use                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `?export`             | For exporting your presentation as a PDF. Add it to your project URL and "Save to PDF" directly from the browser                                                    |
| `?print`              | Turns your slideshow into a printer-friendly, black & white version. Meant for use concurrently with `?export` e.g. `?export&print`                                 |
| `?presenterMode=true` | Displays a Presenter Mode for ease of presentation. For more info on this mode, please see [Presenting](./basic-concepts.md#presenting) in our Basic Concepts doc   |
| `?timer`              | Displays a timer inside of the [Presenter Mode](./basic-concepts.md#presenting) view. Meant for use concurrently with `?presenterMode=true` e.g. `?presenter&timer` |
