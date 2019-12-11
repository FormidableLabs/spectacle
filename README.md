# Spectacle

<!-- TODO BADGES -->

✨ A ReactJS based Presentation Library ✨


<!-- Looking for a quick preview of what you can do with Spectacle? Check out our Live Demo deck [here](TODO). -->

Have a question about Spectacle? Submit an issue in this repository using the "Question" template.

<!--
## Table of Contents
TODO - automate this
-->

## Getting Started

First, you'll have to decide how you want to use Spectacle. There are a couple of different ways to build your presentation.

1. Using [**MDX**](https://mdxjs.com/)

   - Steps
   - To
   - Start
   - With an
   - MDX Presentation

2. Using [**Classic JSX**](https://reactjs.org/docs/introducing-jsx.html)

   - Steps
   - To
   - Start
   - With a
   - JSX Presentation

## Development

```sh
yarn add spectacle
```

### Basic Concepts

Spectacle is a library exposes a number of React components you can use to build a presentation using React components.

#### Deck

Wraps slide components, providing templates to slides as well as keyboard bindings. It orchestrates animations of Slide components in and out of the presentation.

#### Slide

Wraps slides, is controlled by the deck component.

#### Notes

Slides may have speaker notes associated with them using the `Notes` component. These notes can be accessed using the presenter deck using `alt + p (mac)` or `Alt + Shift + p (win)`.

#### Layout Components

We have a number of styleable layout components to make constructing great looking slides easier.

These include:

| Components    |                                                                         |
| ------------- | ----------------------------------------------------------------------- |
| Appear        | Wraps a slideElement that can animate in.                               |
| CodePane      | Syntax highlighting of code for a number of languages.                  |
| Markdown      | A markdown component that allows the user to write mdx in their slides. |
| FlexBox       |                                                                         |
| Grid          |                                                                         |
| Box           | A child of Grid.                                                        |
| Image         |                                                                         |
| ListItem      |                                                                         |
| OrderedList   |                                                                         |
| Quote         |                                                                         |
| Text          |                                                                         |
| UnorderedList |                                                                         |
| Heading       |                                                                         |

#### Themes

Themeing is done using a [styled-system](https://styled-system.com/) theme object which is passed to the `Deck` component.

Spectacle will then merge your theme with the default theme (keys overriden will be replaced by user-defined theme).

The `Deck` provides the ThemeContext so the user's only concern is with writing the theme.

You can import theme properties using the styled-system [style functions](https://styled-system.com/getting-started#create-a-component).

If you need to extend layout components, you can use the [extends API](https://www.styled-components.com/docs/basics#extending-styles) from styled-components.

```javascript
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

### API

## Build & Deployment

<!-- TODO will we have an out-of-the-box solution for deployment? -->

```sh
yarn run build
```

## Presenting

Spectacle comes with a built-in Presenter view. It shows you a slide lookahead, your current slide and related notes, and the current time.

![Screenshot of Spectacle's Presenter view with a clock](TODO)

You also have the option of a stopwatch to count the elapsed time.

![Screenshot of Spectacle's Presenter view with a stopwatch](TODO)

To present,

1. Run `yarn start`
2. Navigate to [localhost:3000/#](https://localhost:3000/#) to view your presentation
3. Open a second browser window and navigate to [localhost:3000/#/0?presenter](http://localhost:3000/#/0?presenter) to view your presentation with notes and a clock. Add [?presenter&timer](http://localhost:3000/#/0?presenter&timer) to switch from a clock a timer.

## FAQ

Can I write my presentation in TypeScript?

Can I easily create templates?

Can I export my slides for use elsewhere?

What is the preferred way to deploy a Spectacle presentation?
