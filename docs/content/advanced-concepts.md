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

<a name="deployment"></a>

## Deployment
